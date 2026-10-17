/**
 * Thin, dependency-free adapters for the three providers a user can bring a key
 * for. Each turns Quote's neutral conversation into the provider's wire format
 * and back. The key is only ever placed in a request header, never a URL.
 */
export type ProviderId = "anthropic" | "openai" | "google";

export const PROVIDERS: Record<
  ProviderId,
  { label: string; defaultModel: string; models: string[]; keyPrefix: string; keysUrl: string }
> = {
  anthropic: {
    label: "Anthropic",
    defaultModel: "claude-sonnet-5-5",
    models: ["claude-sonnet-5-5", "claude-opus-5-5", "claude-haiku-5-5"],
    keyPrefix: "sk-ant-",
    keysUrl: "https://console.anthropic.com/settings/keys",
  },
  openai: {
    label: "OpenAI",
    defaultModel: "gpt-4o",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4.1"],
    keyPrefix: "sk-",
    keysUrl: "https://platform.openai.com/api-keys",
  },
  google: {
    label: "Google Gemini",
    defaultModel: "gemini-2.5-flash",
    models: ["gemini-2.5-flash", "gemini-2.5-pro"],
    keyPrefix: "AIza",
    keysUrl: "https://aistudio.google.com/apikey",
  },
};

export const isProvider = (value: unknown): value is ProviderId =>
  typeof value === "string" && value in PROVIDERS;

export interface ToolDef {
  name: string;
  description: string;
  schema: Record<string, unknown>;
}

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  /** Provider-specific data that must be echoed back (e.g. Gemini thought signatures). */
  extra?: unknown;
}

export type Turn =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string; calls: ToolCall[] }
  | { role: "tool"; results: { call: ToolCall; content: string; isError: boolean }[] };

export interface StepResult {
  text: string;
  calls: ToolCall[];
}

export class ProviderError extends Error {
  constructor(message: string, readonly status = 502) {
    super(message);
  }
}

const TIMEOUT_MS = 90_000;

async function post(url: string, headers: Record<string, string>, body: unknown, signal?: AbortSignal) {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)]) : AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ProviderError("Could not reach the AI provider. Try again in a moment.");
  }

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    const message: string =
      detail?.error?.message ?? detail?.message ?? `The provider returned ${response.status}.`;
    if (response.status === 401 || response.status === 403) {
      throw new ProviderError("The provider rejected your API key. Check it in assistant settings.", 401);
    }
    if (response.status === 429) {
      throw new ProviderError("Your provider rate limit or quota was reached.", 429);
    }
    throw new ProviderError(message.slice(0, 300));
  }
  return response.json();
}

/** Checks a key against the provider's model-listing endpoint, which costs nothing. */
export async function verifyKey(provider: ProviderId, apiKey: string) {
  const request =
    provider === "anthropic"
      ? fetch("https://api.anthropic.com/v1/models?limit=1", {
          headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        })
      : provider === "openai"
        ? fetch("https://api.openai.com/v1/models", { headers: { authorization: `Bearer ${apiKey}` } })
        : fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1", {
            headers: { "x-goog-api-key": apiKey },
          });

  try {
    const response = await request.then((r) => r, () => null);
    if (!response) return "Could not reach the provider to verify the key.";
    if (response.status === 401 || response.status === 403 || response.status === 400) {
      return "That key was rejected by the provider.";
    }
    return response.ok ? null : `The provider returned ${response.status} while verifying the key.`;
  } catch {
    return "Could not verify the key.";
  }
}

// --- Anthropic -------------------------------------------------------------

async function anthropicStep(key: string, model: string, system: string, turns: Turn[], tools: ToolDef[], signal?: AbortSignal): Promise<StepResult> {
  const messages = turns.map((turn) => {
    if (turn.role === "user") return { role: "user", content: turn.text };
    if (turn.role === "assistant") {
      return {
        role: "assistant",
        content: [
          ...(turn.text ? [{ type: "text", text: turn.text }] : []),
          ...turn.calls.map((c) => ({ type: "tool_use", id: c.id, name: c.name, input: c.args })),
        ],
      };
    }
    return {
      role: "user",
      content: turn.results.map((r) => ({
        type: "tool_result",
        tool_use_id: r.call.id,
        content: r.content,
        is_error: r.isError,
      })),
    };
  });

  const data = await post(
    "https://api.anthropic.com/v1/messages",
    { "x-api-key": key, "anthropic-version": "2023-06-01" },
    {
      model,
      max_tokens: 4096,
      system,
      messages,
      tools: tools.map((t) => ({ name: t.name, description: t.description, input_schema: t.schema })),
    },
    signal
  );

  const blocks: any[] = data?.content ?? [];
  return {
    text: blocks.filter((b) => b.type === "text").map((b) => b.text).join(""),
    calls: blocks
      .filter((b) => b.type === "tool_use")
      .map((b) => ({ id: b.id, name: b.name, args: b.input ?? {} })),
  };
}

// --- OpenAI ----------------------------------------------------------------

async function openaiStep(key: string, model: string, system: string, turns: Turn[], tools: ToolDef[], signal?: AbortSignal): Promise<StepResult> {
  const messages: any[] = [{ role: "system", content: system }];
  for (const turn of turns) {
    if (turn.role === "user") messages.push({ role: "user", content: turn.text });
    else if (turn.role === "assistant") {
      messages.push({
        role: "assistant",
        content: turn.text || null,
        ...(turn.calls.length
          ? {
              tool_calls: turn.calls.map((c) => ({
                id: c.id,
                type: "function",
                function: { name: c.name, arguments: JSON.stringify(c.args) },
              })),
            }
          : {}),
      });
    } else {
      for (const r of turn.results) {
        messages.push({ role: "tool", tool_call_id: r.call.id, content: r.content });
      }
    }
  }

  const data = await post(
    "https://api.openai.com/v1/chat/completions",
    { authorization: `Bearer ${key}` },
    {
      model,
      messages,
      tools: tools.map((t) => ({
        type: "function",
        function: { name: t.name, description: t.description, parameters: t.schema },
      })),
    },
    signal
  );

  const message = data?.choices?.[0]?.message ?? {};
  return {
    text: message.content ?? "",
    calls: (message.tool_calls ?? []).map((c: any) => {
      let args: Record<string, unknown> = {};
      try {
        args = JSON.parse(c.function?.arguments || "{}");
      } catch {
        // Malformed arguments surface as a tool error the model can correct.
      }
      return { id: c.id, name: c.function?.name, args };
    }),
  };
}

// --- Google ----------------------------------------------------------------

const GEMINI_SCHEMA_KEYS = new Set(["type", "description", "properties", "required", "items", "enum", "format", "nullable"]);

/** Gemini accepts only an OpenAPI subset of JSON Schema. */
function geminiSchema(node: any): any {
  if (Array.isArray(node)) return node.map(geminiSchema);
  if (!node || typeof node !== "object") return node;
  // Free-form objects (no declared properties) are rejected; accept them as JSON text instead.
  if (node.type === "object" && !node.properties) {
    return { type: "string", description: `${node.description ?? "Value"} (as JSON)` };
  }
  const out: Record<string, unknown> = {};
  if (Array.isArray(node.type)) {
    // ["string", "null"] -> "string" + nullable
    const types = node.type.filter((t: string) => t !== "null");
    out.type = types[0] ?? "string";
    if (types.length !== node.type.length) out.nullable = true;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k === "type" && Array.isArray(v)) continue;
    if (k === "properties" && v && typeof v === "object") {
      out.properties = Object.fromEntries(Object.entries(v).map(([name, schema]) => [name, geminiSchema(schema)]));
    } else if (GEMINI_SCHEMA_KEYS.has(k)) {
      out[k] = k === "items" ? geminiSchema(v) : v;
    }
  }
  return out;
}

async function googleStep(key: string, model: string, system: string, turns: Turn[], tools: ToolDef[], signal?: AbortSignal): Promise<StepResult> {
  const contents = turns.map((turn) => {
    if (turn.role === "user") return { role: "user", parts: [{ text: turn.text }] };
    if (turn.role === "assistant") {
      return {
        role: "model",
        parts: [
          ...(turn.text ? [{ text: turn.text }] : []),
          ...turn.calls.map((c) => ({ functionCall: { name: c.name, args: c.args }, ...((c.extra as object) ?? {}) })),
        ],
      };
    }
    return {
      role: "user",
      parts: turn.results.map((r) => ({
        functionResponse: { name: r.call.name, response: { content: r.content, isError: r.isError } },
      })),
    };
  });

  const data = await post(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    { "x-goog-api-key": key },
    {
      systemInstruction: { parts: [{ text: system }] },
      contents,
      tools: [
        {
          functionDeclarations: tools.map((t) => ({
            name: t.name,
            description: t.description,
            parameters: geminiSchema(t.schema),
          })),
        },
      ],
    },
    signal
  );

  const parts: any[] = data?.candidates?.[0]?.content?.parts ?? [];
  const calls: ToolCall[] = [];
  for (const part of parts) {
    if (part.functionCall) {
      calls.push({
        id: `call_${calls.length}_${Date.now()}`,
        name: part.functionCall.name,
        args: part.functionCall.args ?? {},
        extra: part.thoughtSignature ? { thoughtSignature: part.thoughtSignature } : undefined,
      });
    }
  }
  return { text: parts.filter((p) => typeof p.text === "string" && !p.thought).map((p) => p.text).join(""), calls };
}

export function runStep(
  provider: ProviderId,
  apiKey: string,
  model: string,
  system: string,
  turns: Turn[],
  tools: ToolDef[],
  signal?: AbortSignal
) {
  const step = provider === "anthropic" ? anthropicStep : provider === "openai" ? openaiStep : googleStep;
  return step(apiKey, model, system, turns, tools, signal);
}
