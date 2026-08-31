import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/brand/logo";
import {
  SCOPE_LABELS,
  isRegisteredRedirect,
  normalizeScopes,
  type Scope,
} from "@/lib/oauth/server";

/**
 * The consent screen -- the authorization endpoint clients send the user to.
 *
 * Registration is open, so this page is the only thing standing between a
 * client and someone's notes: nothing is granted until the signed-in owner
 * presses Allow.
 */

export const metadata: Metadata = {
  title: "Authorize",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Params = Record<string, string | string[] | undefined>;

const single = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** A problem with the redirect_uri itself can never be reported by redirecting. */
function Fault({ title, detail }: { title: string; detail: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191919] px-4 text-[#f1f1ef]">
      <div className="w-full max-w-md rounded-xl border border-[#3f3f3f] bg-[#202020] p-6">
        <Logo />
        <h1 className="mt-5 text-lg font-medium">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#9b9b9b]">{detail}</p>
      </div>
    </main>
  );
}

export default async function AuthorizePage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;

  const clientId = single(params.client_id);
  const redirectUri = single(params.redirect_uri);
  const responseType = single(params.response_type);
  const codeChallenge = single(params.code_challenge);
  const codeChallengeMethod = single(params.code_challenge_method) ?? "S256";
  const state = single(params.state) ?? "";
  const resource = single(params.resource) ?? "";
  const scopes = normalizeScopes(single(params.scope));

  if (!clientId || !redirectUri) {
    return <Fault title="Incomplete request" detail="client_id and redirect_uri are required." />;
  }

  const client = await prisma.oAuthClient.findUnique({ where: { clientId } });
  if (!client) {
    return (
      <Fault
        title="Unknown client"
        detail="This app is not registered with Quote. Remove the connector and add it again so it can re-register."
      />
    );
  }

  if (!isRegisteredRedirect(client.redirectUris, redirectUri)) {
    return (
      <Fault
        title="Redirect mismatch"
        detail="This app asked to be sent somewhere it did not register. Nothing was shared."
      />
    );
  }

  // From here the redirect_uri is trusted, so protocol errors go back to the client.
  const bounce = (error: string, description: string) => {
    const url = new URL(redirectUri);
    url.searchParams.set("error", error);
    url.searchParams.set("error_description", description);
    if (state) url.searchParams.set("state", state);
    redirect(url.toString());
  };

  if (responseType !== "code") bounce("unsupported_response_type", "Only response_type=code is supported.");
  if (!codeChallenge) bounce("invalid_request", "PKCE is required: send code_challenge.");
  if (codeChallengeMethod !== "S256") bounce("invalid_request", "code_challenge_method must be S256.");

  const session = await auth();
  const user = session?.user as { id?: string; email?: string; name?: string } | undefined;

  if (!user?.id) {
    // Sign in, then land back on this exact consent request.
    const self = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      const flat = single(value);
      if (flat !== undefined) self.set(key, flat);
    }
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`/oauth/authorize?${self}`)}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191919] px-4 py-10 text-[#f1f1ef]">
      <div className="w-full max-w-md rounded-xl border border-[#3f3f3f] bg-[#202020] p-6">
        <Logo />

        <h1 className="mt-5 text-lg font-medium">
          Connect <span className="text-white">{client.name}</span> to Quote?
        </h1>
        <p className="mt-1.5 text-sm text-[#9b9b9b]">
          Signed in as {user.email ?? user.name}.
        </p>

        <ul className="mt-5 space-y-2 rounded-lg border border-[#3f3f3f] bg-[#1c1c1c] p-4">
          {scopes.map((scope: Scope) => (
            <li key={scope} className="flex gap-2 text-sm text-[#d4d4d4]">
              <span aria-hidden className="text-[#2F9E6E]">✓</span>
              {SCOPE_LABELS[scope]}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs leading-relaxed text-[#7a7a7a]">
          It will reach every workspace you belong to. Anyone can register a client name,
          so only continue if you started this from {client.name} yourself. You can
          disconnect it later in Settings ▸ Connections.
        </p>

        <form action="/api/oauth/decision" method="post" className="mt-6 flex gap-2">
          <input type="hidden" name="client_id" value={clientId} />
          <input type="hidden" name="redirect_uri" value={redirectUri} />
          <input type="hidden" name="scope" value={scopes.join(" ")} />
          <input type="hidden" name="state" value={state} />
          <input type="hidden" name="resource" value={resource} />
          <input type="hidden" name="code_challenge" value={codeChallenge} />
          <input type="hidden" name="code_challenge_method" value={codeChallengeMethod} />

          <button
            type="submit"
            name="decision"
            value="deny"
            className="flex-1 rounded-md border border-[#3f3f3f] px-4 py-2 text-sm text-[#b8b8b8] transition-colors hover:bg-[#2a2a2a] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            name="decision"
            value="allow"
            className="flex-1 rounded-md bg-[#f1f1ef] px-4 py-2 text-sm font-medium text-[#202020] transition-colors hover:bg-white"
          >
            Allow
          </button>
        </form>
      </div>
    </main>
  );
}
