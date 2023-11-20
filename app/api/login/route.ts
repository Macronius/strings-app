// POST endpoint to login the user

import { sql } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  // QUERY USER DATA
  const json = await request.json();
  console.log(`json.password: ${json.password}`);
  //
  const res = await sql(
    "select id, username, password from users where username ilike $1",
    [json.username]
  );
  //   console.log(res);

  // USER CONFIRMATION
  if (res.rowCount === 0) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  // AUTHENTICATE
  const user = res.rows[0];
//   console.log(`user.password: ${user.password}`);
  const match = await bcrypt.compare(json.password, user.password);
  if (!match) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }

  // GRANT USER JWT
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" }) // algorithm
    .setSubject(user.id) // usually the primary key of the user
    .setExpirationTime("2w") // 2 weeks
    .sign(new TextEncoder().encode("my-jwt-secret"));

  //
  const response = NextResponse.json({ msg: "login success" });
  // NOTE: cookies is the preferred approach to storing JWT credentials
  response.cookies.set("jwt-token", token, {
    // NOTE: these settings are to prevent cross-site request forgery vulnerabilities
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  });
  //
  return response;
}
