import { createSlice } from "@reduxjs/toolkit";

 const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:''
    },reducers:{
        setToken:(state,action)=>{
            
                state.token=action.payload
            
        },
        dumpState:(state)=>{
            state.token=null
        }
    }
})

export const{setToken,dumpState}=authSlice.actions
export default authSlice.reducer