import { NextResponse } from "next/server";


export async function GET(request: Request) {
    // build the response
    const response = NextResponse.json({msg: "logout success"});
    response.cookies.set("jwt-token", "");
    return response;
}