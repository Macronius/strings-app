import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


// AUTHENTICATION MIDDLEWARE
export async function middleware(request: NextRequest) {
  //
  const pathname = request.nextUrl.pathname;
  // inject authentication middleware into any of the following paths
  const authenticatedAPIRoutes = [
    pathname.startsWith("/api/users"),
    pathname.startsWith("/api/posts"),
  ];
  //
  if (authenticatedAPIRoutes.includes(true)) {

    // check if cookie
    const cook = request .cookies.has("jwt-token");
    // cook && console.log("jwt-token present");

    // get cookie
    const cookie = request.cookies.get("jwt-token");
    // cook && console.log(cookie);

    //
    if (!cookie || !cookie.value) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    //
    try {
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
