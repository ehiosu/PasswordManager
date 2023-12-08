import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalContext, { ModalOptions } from './ModalContext'
import {  useQueryClient } from 'react-query'
import { useAuth } from '@clerk/clerk-react'
import { sharePassword } from '../functionality'

export const SharePassword = () => {
    const [errorState,setErrorState]=useState("none")
    const [errorMessage,setErrorMessage]=useState("")
    const  {register,formState:{errors},handleSubmit,reset}=useForm({
        defaultValues:{
            "username":""
        }
    })
    let timeout;
    const client=useQueryClient()
    const {getToken}=useAuth()  
    const  {setModal,selectedPassword}=useContext(ModalContext)
    const onSubmit=async(values)=>{
        setErrorState(()=>"loading")
        sharePassword(selectedPassword.id,await getToken(),values).then((resp)=>{
                        setErrorState(()=>"success")
                        timeout= setTimeout(()=>{
                            handleClose()
                        },1500)
                    }).catch((err)=>{
                        setErrorState(()=>"error")
                        if(err.message=='Request failed with status code 404'){
                            setErrorMessage("User not found")
                            
                        }
                        timeout= setTimeout(()=>{
                            setErrorState(()=>"none")
                            setErrorMessage(()=>"")
                        },1500)
                    })
    }
    const   handleClose=async()=>{
        reset()
        await client.removeQueries('decryptedData')
        setModal(ModalOptions.NONE)
    }

    // const sharePasswordMutation=useMutation({
    //     mutationKey:["SharePassword"],
    //     mutationFn:async(values)=>{
    //        
    //     },
    //     onError:(data)=>{
    //         console.log('error here')
    //         console.log(data.message,'error')
    //         return data
    //     },
       
    // })
    useEffect(()=>{
        return()=>{
            clearTimeout(timeout)
        
        }
    })
  return (
    <section    className='lg:w-[30vw]  lg:h-auto bg-white  rounded-md    border-r-8  p-4  border-r-blue-400/40   relative   h-[30vh]  w-[80vw]  flex  flex-col'>
        <i  className='bi   bi-x    md:text-[1.4rem] text-[1.2rem]      absolute top-2   right-2'   onClick={()=>handleClose()}></i>
        <p  className='text-[1.2rem]    font-semibold'>Share your Password</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text"  placeholder='User Email' {...register("username",{
            required:"Email is Required"
        })}   className='w-full   h-10    mt-4    outline-none   border-b-2  border-b-neutral-400/40  rounded-md  px-2  ' />
        <p>{errors.email?.message}</p>
        <p  className='w-max    mx-auto text-[0.8275rem]   text-neutral-400 my-2'>{errorState==="error"? errorMessage!==""?errorMessage:"Error sharing password,try again in a few minutes.":""}</p>
        <p  className='w-max    mx-auto text-[0.8275rem]   text-neutral-400 '>{errorState==="success"&&"Successfully-shared-Password!!"}</p>
        <button className='w-full   h-8 bg-blue-400/60  my-4    text-white disabled:bg-neutral-500 disabled:hover:cursor-not-allowed' type="submit"   disabled={errorState==="loading"}>Share</button>
        </form>
    </section>
  )
}
