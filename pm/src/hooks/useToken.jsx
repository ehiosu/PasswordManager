import React from 'react'
import { useSelector } from 'react-redux'

export const useToken = () => {
  const token=useSelector((state)=>state.auth.token)
  return token
}
