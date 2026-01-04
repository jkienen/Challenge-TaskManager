const ContentSecurityPolicy = `
  default-src 'self';
  connect-src 'self' http://localhost:8000;
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' 'unsafe-eval';
  frame-src 'self'; 
  frame-ancestors 'self';
`

const securityHeaders = [

  /* More faster links */
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },

  /* Only HTTPS */
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubdomains; preload'
  },

  /* Block redirects cross-site */
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },

  /* Show itens from who? */
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },

  /* Allow control of itens */
  {
    key: 'Permissions-Policy',
    value: 'geolocation=()'
  },

  /* This can prevent XSS exploits */
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },

  /* Controls how much information the browser includes */
  {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  },

  /* Prevent cross-site scripting (XSS), clickjacking and other code injection attacks */
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
  
];

module.exports = {

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  env: {
    BACKEND_API: 'http://localhost:8000',
  },

  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true
}