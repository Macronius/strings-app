import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";


// NOTE: this endpoint will serve several purposes
//      - use to fetch the posts of other users too

export async function GET(request: Request) {
    // get jsw payload bc this is an authenticated endpoint
    const jwtPayload = await getJWTPayload();

    const {searchParams} = new URL(request.url);
    const username = searchParams.get("username");
    const page = (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
    //
    const limit = 1;
    const offset = page*limit;

    //
    const query_statement = `select p.*, u.username, u.avatar 
        from posts p inner join users u
        on p.user_id = u.id
        where user_id = $1
        order by created_at desc
        limit $2 offset $3
    `;

    // if username is passed in, then also search for other users
    if (username) {
        // TODO: use for profile page of other users
    }
    // if username is not passed in, then fetch the posts for currently logged-in user
    // currently logged-in user functionality
    const res = await sql(query_statement, [jwtPayload.sub, limit, offset]);

    //
    return NextResponse.json({data: res.rows});
}