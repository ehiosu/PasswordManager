import { useState } from 'react'
import './App.css'
import ModalContext, { ModalOptions } from './Components/ModalContext'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Dashboard } from './Pages/Dashboard'
import { AuthContext } from './Components/AuthContext'
import { ClerkProvider,SignedIn,SignedOut} from "@clerk/clerk-react";

import { Login, CreateAccount } from './Pages/Login'
import { Landing } from './Pages/Landing'


function App() {
  const clerkKey=import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY
 
  const [selectedPassword,setSelectedPassword]=useState(null)
  const [modal,setModal]=useState([ModalOptions.NONE])
  const Nav=useNavigate()

  return (
    <ClerkProvider  publishableKey={clerkKey} navigate={(to)=>Nav(to)}>
       <ModalContext.Provider  value={{selectedPassword,setSelectedPassword,modal,setModal}}>
    <Routes>
     
     
     

       <Route path='/Dashboard' element={
        <>
        <SignedIn>
          <Dashboard/>
        </SignedIn>
        
        </>
       } />
       <Route path='/Signin/*'  element={<Login/>}/>
       <Route path='/Signup/*'  element={<CreateAccount/>}/>
       
   
        <Route  path='/'  element={<Landing/>}/>
    
   

   
      </Routes>

      </ModalContext.Provider>
      </ClerkProvider>
    
    
  )
}

export default App
