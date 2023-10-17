import { connect } from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user=await User.findOne({email});
    if(!user){
        return NextResponse.json({error:"User Does Not exists"},{status:400});
    }
    
    const isValidPassword=await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return NextResponse.json({error:"Invalid Password"},{status:400})
    }
    
    
    const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
    }
    
    const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    
    const response=NextResponse.json({message:"Login Successfully",scucess:true,username:user.username})
    response.cookies.set("token",token,{
        httpOnly:true,
    })
    
    return response;
  } catch (error) {
    return NextResponse.json({error:"Invalid Request"},{status:400})
  }
}
