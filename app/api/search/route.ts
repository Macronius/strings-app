import { sql } from "@/db";
import { NextResponse } from "next/server";

// A generic search endpoint

export async function GET(request: Request) {
    //
    const {searchParams} = new URL(request.url);
    const search = searchParams.get("q"); // TODO-07
    // ensure user is sending search query
    if (!search) {
        return NextResponse.json({error: "search parameter required"}, {status: 400});
    }
    console.log(search)
    //
    const res = await sql("select id, username, avatar from users where username ilike $1 limit 10", ["%" + search + "%"]);
    // TODO-08 - can be modified to search for tags or content
    if (res) {
        return NextResponse.json({data: res.rows})
    } 
}