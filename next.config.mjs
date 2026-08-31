/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Page images are arbitrary user-supplied URLs, so they are served as-is.
    unoptimized: true,
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
