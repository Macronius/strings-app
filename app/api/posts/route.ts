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
    const limit = 3;
    const offset = page*limit;

    //
    const query_statement = `select p.*, u.username, u.avatar 
        from posts p inner join users u
        on p.user_id = u.id
        where user_id = $1
        order by created_at desc
        limit $2 offset $3
    `;

    // IF USERNAME IS PASSED IN, then also search for other users
    if (username) {
        //
        const userRes = await sql("select * from users where username = $1", [username]);
        //
        if (userRes.rowCount === 0) {
            return NextResponse.json({error: "not found"}, {status: 404});
        }
        const user = userRes.rows[0];
        //
        const postsRes = await sql(query_statement, [user.id, limit, offset]);
        //
        return NextResponse.json({data: postsRes.rows})
    }

    // IF USERNAME IS NOT PASSED IN, then fetch the posts for currently logged-in user
    // currently logged-in user functionality
    const res = await sql(query_statement, [jwtPayload.sub, limit, offset]);

    //
    return NextResponse.json({data: res.rows});
}

// create new post
export async function POST(request: Request) {
    //
    const jwtPayload = await getJWTPayload();
    const user_id = jwtPayload.sub;
    //
    const json = await request.json();
    const content = json.content;
    //
    const res = await sql(
        `insert into posts (user_id, content) values ($1, $2) returning *`, 
        [user_id, content]
    );
    console.log("app > api > posts > PUT: create-post");
    console.log(res)
    //
    return NextResponse.json({data: res.rows[0]}, {status: 201});
}