import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request){
    try {
        const userId=await getDataFromToken(request);
        const user=await User.findOne({_id:userId}).select("-password")
        
        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error) {
        return NextResponse.json({error:"Invalid Request"},{status:400})
    }
} 