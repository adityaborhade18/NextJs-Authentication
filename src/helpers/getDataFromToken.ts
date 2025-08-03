import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import Error from "next/error";

export const getDataFromToken=(request:NextRequest)=>{
    try{
       const token= request.cookies.get('token')?.value || '';
       const decodedData:any= jwt.verify(token,process.env.TOKEN_SECRET!)
       return decodedData.id
    }catch(error:any){
     throw new Error(error.message);
    }
}