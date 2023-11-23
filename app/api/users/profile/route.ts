import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // get currently logged in user
  const jwtPayload = await getJWTPayload();
//   console.log(jwtPayload);

  // fetch user data
  const res = await sql("select id, username, avatar from users where id = $1", [
    jwtPayload.sub,
  ]);
//   console.log(res);
  // parse user from results
  const user = res.rows[0];

  // return user data
  return NextResponse.json({data: user})
}
