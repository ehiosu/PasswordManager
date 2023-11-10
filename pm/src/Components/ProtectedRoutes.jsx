import React from 'react'
import {SignedIn}   from    '@clerk/clerk-react'
import { Route } from 'react-router-dom'
import { Dashboard } from '../Pages/Dashboard'
export const ProtectedRoutes = () => {
  return (
    <>
    <SignedIn>
  <Dashboard/>

    </SignedIn>
    
    </>
  )
}
