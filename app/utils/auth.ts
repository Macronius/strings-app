import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getJWTPayload() {
  const cookieStore = cookies();
  // get the token from the cookieStore
  const token = cookieStore.get("jwt-token");

  // get secret - take string as input and return Uint8Array containing UTF-8 encoded text
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  // verify token against the secret
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
  //
  return payload;
}
