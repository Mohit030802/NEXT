'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
const page = () => {
    const router=useRouter()
    const [loading,setLoading]=useState(false)
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [user,setUser]=useState ({
        email:"",
        password:"",
        
        
    })
    const onLogin=async ()=>{
        try {
            setLoading(true)
            const response=await axios.post('/api/users/login',user);
            console.log("User Logged In successfully",response)
            toast.success("User Logged In successfully")
            router.push(`/profile/${user.email}`)

        } catch (error) {
            console.log("Login failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
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

                <h1 className='text-3xl font-mono font-bold'>{loading ? "Loading.....": "Log In"}</h1>
                <div className='flex flex-col justify-start items-start m-4 '>
                    
                    <label className='mt-4 font-mono'>Email</label>
                    <input className='border-2 w-full mt-2 p-2 shadow-md rounded-md' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='enter your email here.....' type="email" />
                    <label className='mt-4 font-mono' >Password</label>
                    <input className='border-2 w-full mt-2 p-2 shadow-md rounded-md' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='enter your password here.....' type="password" />
                </div>
                <div>
                    {/* <Link href={`/profile/${user.email}`}> */}
                    <button className='bg-black p-3 text-white rounded-2xl font-mono' onClick={onLogin}>{buttonDisabled ? "Can't Login":" Log In"}</button>
                    {/* </Link> */}
                    <p className='text-gray-300 mt-4'>Don't have an account! <Link href='/signup'><span className='text-gray-500'>Register</span></Link></p>
                </div>
                </div>
            </div>
        </>
    )
}

export default page
