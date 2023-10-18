'use client'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const page = ({ params }) => {
  const router=useRouter()
  const [data,setData]=useState('nothing')
  const logout=async()=>{
    await axios.get('/api/users/logout')
    toast.success("Logged Out Successfully")
    router.push('/login')
  }
  const getUserData=async()=>{
    console.log("object")
    const res=await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center py-4 min-h-screen'>
        <h1 className='text-3xl '>Profile of {params.id}</h1>
        <h2>{data}</h2>
        <div className='flex mt-4 justify-center items-center text-center'>
          <button onClick={logout}  className='bg-blue-700 rounded-lg p-4'>Log Out</button>
          <button onClick={getUserData} className='bg-green-700 rounded-lg p-4'>Get User Info</button>
        </div>
      </div>
    </>
  )
}

export default page
