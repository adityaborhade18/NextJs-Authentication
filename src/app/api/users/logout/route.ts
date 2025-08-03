import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'
import jwt from 'jsonwebtoken'

connect()

export async function GET(request:NextRequest){
    try{
        const response=NextResponse.json({
            message:"Logout successfully",
            success:true
        })

        response.cookies.set("token", "" ,{
            httpOnly:true,
            expires:new Date(0),
        })
        
    }catch(error:any){
        console.log("error is from logout page",error);
        return NextResponse.json({error:error.message}, {status:500})
    }
}