import {configureStore} from '@reduxjs/toolkit'
import  authSlice  from './authSlice'
import passwordSlice from './passwordSlice'
const rootStore=configureStore({
    reducer:{
        auth:authSlice,
        passwords:passwordSlice
    }
})

export default rootStore