import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to handle legacy WordPress URLs that Google may still have indexed.
 * Returns 410 Gone for known stale paths so search engines drop them.
 */

const GONE_PATTERNS = [
  /^\/author\//,
  /^\/sample-page\/?$/,
  /^\/category\//,
  /^\/tag\//,
  /^\/wp-content\//,
  /^\/wp-admin\/?$/,
  /^\/wp-login\.php$/,
  /^\/feed\/?$/,
  /^\/comments\/feed\/?$/,
  /^\/\d{4}\/\d{2}\//,          // date-based post archives (e.g., /2023/01/...)
  /^\/page\/\d+\/?$/,            // paginated archives
  /^\/?p=\d+/,                   // default permalink format
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const pattern of GONE_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse(null, {
        status: 410,
        statusText: "Gone",
        headers: {
          "X-Robots-Tag": "noindex",
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/author/:path*",
    "/sample-page",
    "/category/:path*",
    "/tag/:path*",
    "/wp-content/:path*",
    "/wp-admin",
    "/wp-login.php",
    "/feed",
    "/comments/feed",
    "/page/:path*",
  ],
};
