import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

// GET endpoint
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  // authenticate user to be here
  const jwtPayload = await getJWTPayload();
  //
  const res = await sql(
    // NOTE: id refers to post id
    `select * from posts where id = $1 and user_id = $2`,
    [params.id, jwtPayload.sub]
    // NOTE: the user should only be able to get a single post for their own post. we don't want them to be able to get posts of another user.
  );
  console.log("______res");
  console.log(res);
  //
  if (res.rowCount === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ data: res.rows[0] });
}


// PATCH endpoint
export async function PATCH(request: Request, {params}: {params: {id: number}}) {
    // will want to send through body any new content
    const body = await request.json();
    // user should only be able to update their own posts
    const jwtPayload = await getJWTPayload();
    //
    const res = await sql(
        `select * from posts where user_id = $1 and id = $2`,
        [jwtPayload.sub, params.id]
    );
    //
    if (res.rowCount === 0) {
        return NextResponse.json({error: "not found"}, {status: 404});
    }
    await sql(`update posts set content = $1 where user_id = $2 and id = $3`,
    [body.content, jwtPayload.sub, params.id]);
    //
    return NextResponse.json({msg: "update success"})
}