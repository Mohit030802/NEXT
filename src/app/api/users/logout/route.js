import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"Logout Successfully",
            success:true
        })
        response.cookies.set("token","",{httpOnly:true, expires:Date.now(0)})
        return response;
    } catch (error) {
        return NextResponse.json({error:"Invalid Request"},{status:400})
    }
}