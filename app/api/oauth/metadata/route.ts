import { NextResponse } from "next/server";
import { SCOPES, originFrom } from "@/lib/oauth/server";

/**
 * RFC 8414 authorization server metadata, served at
 * /.well-known/oauth-authorization-server (see the rewrites in next.config.mjs).
 *
 * This is the document clients read to learn they *can* register themselves.
 * Without it, claude.ai and ChatGPT report "does not implement OAuth" and stop.
 */

export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, MCP-Protocol-Version",
};

export async function GET(request: Request) {
  const origin = originFrom(request);

  return NextResponse.json(
    {
      issuer: origin,
      authorization_endpoint: `${origin}/oauth/authorize`,
      token_endpoint: `${origin}/api/oauth/token`,
      registration_endpoint: `${origin}/api/oauth/register`,
      revocation_endpoint: `${origin}/api/oauth/revoke`,
      scopes_supported: [...SCOPES],
      response_types_supported: ["code"],
      response_modes_supported: ["query"],
      grant_types_supported: ["authorization_code", "refresh_token"],
      // Public clients only: PKCE, not a shared secret, is what proves identity.
      token_endpoint_auth_methods_supported: ["none"],
      code_challenge_methods_supported: ["S256"],
      revocation_endpoint_auth_methods_supported: ["none"],
      service_documentation: `${origin}/settings/connections`,
    },
    { headers: { ...CORS, "Cache-Control": "public, max-age=3600" } }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
