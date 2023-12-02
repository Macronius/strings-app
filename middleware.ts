import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// AUTHENTICATION MIDDLEWARE
export async function middleware(request: NextRequest) {
  //
  const basePath = request.nextUrl.basePath;
  const buildId = request.nextUrl.buildId;
  const clone = request.nextUrl.clone;
  const defaultLocale = request.nextUrl.defaultLocale;
  const domainLocale = request.nextUrl.domainLocale;
  const hash = request.nextUrl.hash;
  const host = request.nextUrl.host;
  const hostname = request.nextUrl.hostname;
  const href = request.nextUrl.href;
  const locale = request.nextUrl.locale;
  const origin = request.nextUrl.origin;
  const password = request.nextUrl.password;
  const pathname = request.nextUrl.pathname;
  const port = request.nextUrl.port;
  const protocol = request.nextUrl.protocol;
  const search = request.nextUrl.search;
  const searchParams = request.nextUrl.searchParams;
  const toJSON = request.nextUrl.toJSON;
  const toString = request.nextUrl.toString;
  const username = request.nextUrl.username;

  // inject authentication middleware into any of the following paths
  const authenticatedAPIRoutes = [
    pathname.startsWith("/api/users"),
    pathname.startsWith("/api/posts"),
    pathname.startsWith("/api/follows"),
  ];

  if (authenticatedAPIRoutes.includes(true)) {
    // check if cookie
    const hasCookie = request.cookies.has("jwt-token");

    // get cookie
    const cookie = hasCookie && request.cookies.get("jwt-token");
    // cook && console.log(cookie);

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
}

// QUESTION: how is this utilized?
export const config = {
  matcher: "/:path*",
};
