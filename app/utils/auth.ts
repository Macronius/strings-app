import { cookies } from "next/headers";
import { jwtVerify } from "jose";

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


/**
 * what exactly is in the jwtVerify payload?
 */