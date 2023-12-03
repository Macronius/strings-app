// user_id that the currently logged-in user wants to unfollow

import { getJWTPayload } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}: {params: {user_id: number}}) {
    const jwtPayload = await getJWTPayload();
    //
    const userId = params.user_id;

    // TODO - there is no test to determine if trying to delete a follow that dne

    //
    await sql("delete from follows where user_id = $1 and follower_id = $2", [userId, jwtPayload.sub]);

    //
    return NextResponse.json({mgs: "follow deleted successfully"})
}