import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

// will help to determine whether the signed-in user is following any of the users in the list
export async function GET(request: Request) {
  // bc this is an Authenticated Endpoint
  const jwtPayload = await getJWTPayload();
  //
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");
  //
  const statement =
    "select * from follows where user_id = $1 and follower_id = $2";
  const values = [userId, jwtPayload.sub];
  const res = await sql(statement, values);

  //
  return NextResponse.json({ data: res.rows }, { status: 200 });
}

// if a user wants to follow another user
export async function POST(request: Request) {
    // confirm authentication
    const jwtPayload = await getJWTPayload();
    //
    const json = await request.json();
    console.log("_____ json _____");
    console.log(json);
    
    // check if user already being following
    const res1 = await sql(
        "select * from follows where user_id = $1 and follower_id = $2",
        [json.user_id, jwtPayload.sub]
    );
    // confirm following
    if (res1.rowCount! > 0) {
        return NextResponse.json({error: "already following"}, {status: 409})
    }

    // follow user
    await sql(
        "insert into follows (user_id, follower_id) values ($1, $2)",
        [json.user_id, jwtPayload.sub]
    );

    //
    return NextResponse.json({msg: "follow success"});
}