// admin authentication

import { authorizeAdmin } from "@/app/utils/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

// this cannot exist in the traditional middleware.ts file because it cannot run sql (not sure why though)
//
// required is an sql db fetch user.is_admin
// this is why this will exist in its own utils middleware type file




// PATCH - because only "changing one thing"
export async function PATCH(request: Request, {params}: {params: {id: number}}) {
    const {id} = params;
    // call authorizeAdmin function, where required ananymous function parameter
    return authorizeAdmin(async () => {
        console.log(`flagging ${id} as misinformation`);
        //
        await sql(
            "update posts set is_misinformation = true, is_misinformation_flagged_at = now() where id = $1",
            [id]
        );
        //
        return NextResponse.json({msg: "flagged as misinformation"})
    })
}