import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    //
    const pathname = request.nextUrl.pathname;
    // I think this means any route beginning with /api/users will be preceeded by this middleware function
    const authenticatedAPIRoutes = [pathname.startsWith("/api/users")];
    //
    if (authenticatedAPIRoutes.includes(true)) {
        const cookie = request.cookies.get("jwt-token");
        //
        if (!cookie || !cookie.value) {
            return NextResponse.json({error: "unauthenticated"}, {status: 401})
        }
        //
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            //
            await jwtVerify(cookie.value, secret);
        } catch (err) {
            console.error(err);
            return NextResponse.json({error: "internal server error"}, {status: 500})
        }
    }
}

export const config = {
    matcher: "/:path*",
}