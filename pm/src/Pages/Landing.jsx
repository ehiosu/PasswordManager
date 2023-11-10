
import { useAuth } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Landing = () => {
  const {isSignedIn}=useAuth()
  const Nav=useNavigate()
  return (
    <main>
      Landing

      {
        isSignedIn  && <button className='w-max p-1  border border-red-400  mx-2  rounded-md' onClick={()=>{
          Nav('/Dashboard')
        }}>Go-To-Dashboard</button>
      }
    </main>
  )
}
