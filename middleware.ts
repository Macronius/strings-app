import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// NOTE: SQL cannot be run in middleware file

// AUTHENTICATION MIDDLEWARE
export async function middleware(request: NextRequest) {
  //
  const pathname = request.nextUrl.pathname;

  // inject authentication middleware into any of the following paths
  const authenticatedAPIRoutes = [
    pathname.startsWith("/api/users"),
    pathname.startsWith("/api/posts"),
    pathname.startsWith("/api/follows"),
    pathname.startsWith("/api/admin"),
    pathname.startsWith("/api/search"),
  ];

  if (authenticatedAPIRoutes.includes(true)) {
    // check if cookie
    const hasCookie = request.cookies.has("jwt-token");

    // get cookie
    const cookie = hasCookie && request.cookies.get("jwt-token");

    //
    if (!cookie || !cookie.value) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    //
    try {
      // QUESTION: why is TextEncoder the way to encode the jwt secret?
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      //
      await jwtVerify(cookie.value, secret);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
  }

  // inject authentication into any of the following CRON paths
  const authenticatedCronRoutes = [pathname.startsWith("/api/cron")];
  //
  if (authenticatedCronRoutes.includes(true)) {
    // get the key
    const key = request.nextUrl.searchParams.get("cron_api_key");
    const isAuthenticated = key === process.env.CRON_API_KEY;
    if (!isAuthenticated) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
  }
}

// QUESTION: how is this utilized?
export const config = {
  matcher: "/:path*",
};
