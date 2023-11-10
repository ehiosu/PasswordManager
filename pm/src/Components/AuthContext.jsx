import { createContext } from "react";

export const  AuthContext=createContext({
    auth:'',
    refresh:'',
    setAuth:()=>{}
})

