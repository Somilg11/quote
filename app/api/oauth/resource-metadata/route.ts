import { NextResponse } from "next/server";
import { SCOPES, originFrom, resourceUrl } from "@/lib/oauth/server";
import { siteConfig } from "@/lib/brand";

/**
 * RFC 9728 protected resource metadata, served at
 * /.well-known/oauth-protected-resource (see the rewrites in next.config.mjs).
 *
 * The MCP 401 points here; this points at the authorization server. That two
 * hop discovery is exactly what MCP clients walk before showing a login button.
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
      resource: resourceUrl(origin),
      authorization_servers: [origin],
      scopes_supported: [...SCOPES],
      bearer_methods_supported: ["header"],
      resource_name: siteConfig.name,
      resource_documentation: `${origin}/settings/connections`,
    },
    { headers: { ...CORS, "Cache-Control": "public, max-age=3600" } }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
