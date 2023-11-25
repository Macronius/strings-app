import { sql } from "@/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

//QUESTION: why is the Fetch API Request object just available?
//QUESTION: why not use NextRequest ?
export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    "select id, username from users where username ilike $1",
    [json.username]
  );

  // check if user already exists
  if (res.rows.length > 0) {
    return NextResponse.json({ error: "user already exists" }, { status: 400 });
  }

  // if new user, then create new user
  const saltRounds = 10;
  const hash = await bcrypt.hash(json.password, saltRounds);
  await sql("insert into users (username, password, avatar) values ($1, $2, $3)", [
    json.username,
    hash,
    json.avatar,
  ]);

  return NextResponse.json({msg: "registration success"}, {status: 201});
}
