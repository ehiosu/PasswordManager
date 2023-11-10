import React, { useState } from 'react'
import {UserButton} from  '@clerk/clerk-react'
export const Header = () => {
  return (
    <header    className='w-full   h-12   bg-white ' >
        <div    className='md:w-[80%] w-full  md:px-0 px-4 mx-auto h-full  flex    justify-between items-center'>
            <img src="https://res.cloudinary.com/dpxuxtdbh/image/upload/v1694776454/private/assecoLogo_yytbro.jpg"  className='md:w-32  w-24   h-7 object-contain' alt="logo" />
            <p  className='text-[16px]  text-blue-700   font-[500] h-[80%]   flex    items-center   border-b-2   border-b-blue-700   md:w-28  w-24    justify-center '>Dashboard</p>
          <UserButton  afterSignOutUrl='/' />
</div>
    </header>
  )
}


