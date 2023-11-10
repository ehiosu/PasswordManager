import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import ModalContext, { ModalOptions } from './ModalContext'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from '@clerk/clerk-react'
import { sharePassword } from '../functionality'

export const SharePassword = () => {
    const  {register,formState:{errors},handleSubmit}=useForm({
        defaultValues:{
            "username":""
        }
    })
    const client=useQueryClient()
    const {getToken}=useAuth()  
    const  {setModal,selectedPassword}=useContext(ModalContext)
    const onSubmit=(values)=>{
        sharePasswordMutation.mutateAsync(values)
    }
    const   handleClose=async()=>{
        await client.removeQueries('decryptedData')
        setModal(ModalOptions.NONE)
    }

    const sharePasswordMutation=useMutation({
        mutationKey:["SharePassword"],
        mutationFn:async(values)=>{
            sharePassword(selectedPassword.id,await getToken(),values).then(()=>{
                handleClose()
            })
        }
    })
  return (
    <section    className='lg:w-[30vw]  lg:h-[25vh] bg-white  rounded-md    border-r-8  p-4  border-r-blue-400/40   relative   h-[30vh]  w-[80vw]  flex  flex-col'>
        <i  className='bi   bi-x    md:text-[1.4rem] text-[1.2rem]      absolute top-2   right-2'   onClick={()=>handleClose()}></i>
        <p  className='text-[1.2rem]    font-semibold'>Share your Password</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text"  placeholder='User Email' {...register("username",{
            required:"Email is Required"
        })}   className='w-full   h-10    mt-4    outline-none   border-b-2  border-b-neutral-400/40  rounded-md  px-2  ' />
        <p>{errors.email?.message}</p>
        <p>{sharePasswordMutation.error}</p>
        <p  className='w-max    mx-auto text-[0.8275rem]   text-neutral-400 '>{sharePasswordMutation.isSuccess&&"Successfully-shared-Password!!"}</p>
        <button className='w-full   h-8 bg-blue-400/60  my-4    text-white' type="submit"   disabled={sharePasswordMutation.isLoading}>Share</button>
        </form>
    </section>
  )
}
