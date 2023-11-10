import { createSlice } from "@reduxjs/toolkit";
import { getUserCreatedPasswords } from "../functionality";

const passwordSlice=createSlice({
    name:'passwords',
    initialState:{
        passwords:[],
        sharedPasswords:[]
    },
    reducers:{
        getAllPasswords:(state,action)=>{
        return {...state}
        },
        setPasswords:(state,action)=>{
            state.passwords=action.payload.passwords
            state.sharedPasswords=action.payload['shared_passwords']
        },
        dumpState:(state)=>{
            state.passwords=[]
            state.sharedPasswords=[]
        }
    }
})


export const {getAllPasswords,setPasswords,dumpState}=passwordSlice.actions

export const fetchAllPasswords = (auth) => async (dispatch) => {
    try {
      const response = await getUserCreatedPasswords(auth);
      const data = response.data;
  
      dispatch(setPasswords(data));
    } catch (error) {
      // Handle errors here
      console.error('Error fetching passwords:', error);
    }
  };
  
export default passwordSlice.reducer