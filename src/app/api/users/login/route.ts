import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'
import jwt from 'jsonwebtoken'

connect()


export async function  POST(request:NextRequest){
    try{
        
     const reqBody= await request.json()

     const {email, password}= reqBody;
     console.log(reqBody);

     const user=await User.findOne({email});

     if(!user){
        return NextResponse.json({success:false, message:"User does not exist"},{status:400});
     }
     const isMatch=await bcryptjs.compare(password,user.password);

     if(!isMatch){
        return NextResponse.json({success:false, message:"Invalid password or username"},{status:400});
    }
    const tokenData={
         id:user._id,
         email:user.email,
         username:user.username
    }
    const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: '7d'});

    const response=NextResponse.json({
        success:true,
        message:"User logged in successfully",
    });

    response.cookies.set("token", token, {
        httpOnly: true,
    })
    return response;

    }catch(err:any){
        console.log("error is from login page of backend", err);
        return NextResponse.json({success:false, message:err.message},{status:500});
    }
}