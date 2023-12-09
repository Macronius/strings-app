// NOTE: because this will work on Vercel, and on Vercel you cannot specify a method, and I believe it will only support a GET method

import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("executing delete misinformation cron job");
    //
    const res = await sql(
        "delete from posts where is_misinformation = true and is_misinformation_flagged_at <= now() - interval '1 minute'"
        // NOTE: I would rather delete anything created over 24 hrs ago, this would give time to keep everything honest
    );
    //
    return NextResponse.json({msg: `flagged misinformation posts deleted: ${res.rowCount}`})
}