'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


const page = () => {
    const router=useRouter();
    const [user,setUser]=useState ({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const onSignUp=async ()=>{
        try {
            setLoading(true);
            const response =await axios.post('/api/users/signup',user);
            console.log("User signup successfully",response.data)
            router.push('/login')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
        
    },[user])
    return (
        <>
            <div className='flex justify-center items-center min-h-screen py-2 '>
                <div className='bg-white text-black p-4 m-4 w-[50%] text-center rounded-lg shadow-2xl shadow-gray-400 '>

                <h1 className='text-3xl font-mono font-bold'>{loading ? "Loading...." : "Sign Up"}</h1>
                <div className='flex flex-col justify-start items-start m-4 '>
                    <label className='font-mono'>Username</label>
                    <input className='border-2 w-full mt-2 p-2 shadow-md rounded-md' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='enter your username here.....' type="text" />
                    <label className='mt-4 font-mono'>Email</label>
                    <input className='border-2 w-full mt-2 p-2 shadow-md rounded-md' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='enter your email here.....' type="email" />
                    <label className='mt-4 font-mono' >Password</label>
                    <input className='border-2 w-full mt-2 p-2 shadow-md rounded-md' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='enter your password here.....' type="password" />
                </div>
                <div>
                    <button className='bg-black p-3 text-white rounded-2xl font-mono' onClick={onSignUp}>{buttonDisabled ? "No Sign Up" : "Sign Up"}</button>
                    <p className='text-gray-300 mt-4'>Already have an account! <Link href='/login'><span className='text-gray-500'>Click here</span></Link></p>
                </div>
                </div>
            </div>
        </>
    )
}

export default page
