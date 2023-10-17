import React from 'react'

const page = ({params}) => {
  return (
    <>
      <div className='flex justify-center items-center py-4 min-h-screen'>
        <h1 className='text-3xl '>Profile of {params.id}</h1>
      </div>
    </>
  )
}

export default page
