import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { sql } from "@/db";
import { NextResponse } from "next/server";

// authenticate if user is registered
export async function getJWTPayload() {
  //
  const cookieStore = cookies();
  // user was issued a cookie 'jwt-token' upon successful signin
  const token = cookieStore.get("jwt-token");
  // const token = cookies.get("jwt-token");

  // get secret - take string as input and return Uint8Array containing UTF-8 encoded text
  const secret_verification_key = new TextEncoder().encode(process.env.JWT_SECRET!);
  // verify token against the secret_verification_key
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret_verification_key);
  // console.log("app > utils > auth.ts > getJWTPayload: payload");
  // console.log(payload);
  //
  return payload;
}
/** QUESTION:
 * what exactly is in the jwtVerify payload?
 */

// authenticate if user has admin privledge
export async function authorizeAdmin(func: Function) {
  // if authorized to admin, then run function
  const jwtPayload = await getJWTPayload();
  const res = await sql("select is_admin from users where id = $1", [jwtPayload.sub]);
  const data = res.rows[0];
  //
  if (!data.is_admin) {
    return NextResponse.json({error: "unauthorized"}, {status: 403});
  }
  // if user makes it this far, then invoke the passed in function (an anonymous function that will be passed into app>api>admin>flag-misinformation>[id]>route.ts
  return func();
}