import React, { useContext } from 'react'
import { AuthContext } from '../Components/AuthContext'

export const useAuth = () => {
    const {auth,refresh,setAuth}=useContext(AuthContext)
  return {auth,refresh,setAuth}
}
