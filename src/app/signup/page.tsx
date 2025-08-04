"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'; 
import { useRouter } from 'next/navigation';


const page = () => {
  
  const router=useRouter()

  const [user , setUser]=useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisable, setButtonDisable]=useState(true);
  const [loading, setLoading]=useState(false);

  const onSignup=async()=>{
     try{
        setLoading(true);
       const data=await axios.post('/api/users/signup',user)
       console.log("data",data.data);
       toast.success('Signup Successfull')
       router.push('/login')
     }catch(error){
        console.log("error is from client signup page:" , error);
      }
  } 
  
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisable(false);
    }else{
      setButtonDisable(true);
    }
  },[user])

  return (
    <div>
        <h1>{loading ? "Processing..." : "Signup"}</h1>
        
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id='username'
          value={user.username}
          onChange={(e)=>setUser({...user, username:e.target.value})}
           />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id='email'
          value={user.email}
          onChange={(e)=>setUser({...user, email:e.target.value})}
           />   

           <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id='password'
          value={user.password}
          onChange={(e)=>setUser({...user, password:e.target.value})}
           />

           <button onClick={onSignup}>
            {buttonDisable ? "cant signup" : "Signup"}
           </button>
    </div>
    
  )
}

export default page
