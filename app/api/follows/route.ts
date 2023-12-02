
// // will help to determine whether the signed-in user is following any of the users in the list

import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { NextResponse } from "next/server";

// need jwtPayload because this is an authenticated endpoint
// NOTE: in the ecommerce Pro Shop, authentication was handled by being permitted to use a url with /auth in it


export async function GET(request: Request) {
    // bc this is an Authenticated Endpoint
    const jwtPayload = await getJWTPayload();
    //
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("user_id");
    //
    const statement = "select * from follows where user_id = $1 and follower_id = $2"
    const values = [userId, jwtPayload.sub]
    const res = await sql(statement, values)

    //
    return NextResponse.json({data: res.rows}, {status: 200})

    //
    // currently logged in user follows user from PathParamsContext
    // jwtPayload.sub follows user_id from request.url
}