import { NextResponse } from "next/server"


export const getDataFromToken= (request)=>{
    try {
        const token=request.cookies.get('token')?.value || '';
        const decodedToken=jwt.verify(token,process.env.TOKEN_SECRET);  
        return decodedToken.id;
    } catch (error) {
        return NextResponse.json({error:error.message},{status:400})
    }
}