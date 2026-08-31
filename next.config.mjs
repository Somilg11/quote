/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Page images are arbitrary user-supplied URLs, so they are served as-is.
    unoptimized: true,
  },
  async rewrites() {
    // OAuth discovery lives at fixed .well-known paths. Clients also probe the
    // path-suffixed variants (RFC 9728 inserts the resource path), so both the
    // bare document and any suffix resolve to the same metadata.
    return [
      { source: '/.well-known/oauth-authorization-server', destination: '/api/oauth/metadata' },
      { source: '/.well-known/oauth-authorization-server/:path*', destination: '/api/oauth/metadata' },
      { source: '/.well-known/oauth-protected-resource', destination: '/api/oauth/resource-metadata' },
      { source: '/.well-known/oauth-protected-resource/:path*', destination: '/api/oauth/resource-metadata' },
      // Some clients look for an OpenID document before falling back to RFC 8414.
      { source: '/.well-known/openid-configuration', destination: '/api/oauth/metadata' },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // The MCP endpoint is called by external clients and must never be cached.
        source: '/api/mcp',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
}

export default nextConfig
