'use client'
import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link';

const VerifyEmailPage = () => {
  
  const [token,setToken]=useState("");
  const [verified,setVerified]=useState(false);
  const [error,setError]=useState(false);

  const verifyUserEmail=async()=>{
    try{
        await axios.post('/api/users/verifyemail',{token});
        setVerified(true)
    }catch(error:any){
      setError(true);
      console.log(error.response.data);
    }
    
  }

  useEffect(()=>{
    const urlToken=window.location.search.split("=")[1];
    setToken(urlToken || "");
  },[])

  useEffect(()=>{
    if(token.length > 0){
      verifyUserEmail();
    }
  },[token])

  return (
    <div className='flex flex-col justify-center items-center '>
          <h1>Verify Email</h1>
          <h2>{token ? `${token}` : "No token found"}</h2>

          {verified && (
            <div>
              <h2>Email Verified</h2>

              <p>Thank you for verifying your email address.</p>
              <Link href='/login'>Login</Link>
            </div>
          )}
          {error && (
            <div>
              <h2>Invalid Token</h2>
              <p>Invalid token provided. Please try again.</p>
             
            </div>

          )}

    </div>
  )
}

export default VerifyEmailPage
