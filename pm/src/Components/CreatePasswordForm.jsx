import React, { useContext } from 'react'
import ModalContext, { ModalOptions } from './ModalContext'
import {useForm}   from    'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import { createNewPassword } from '../functionality'
import { useAuth } from '@clerk/clerk-react'
export const CreatePasswordForm = () => {
    const client=useQueryClient()
    const {modal,setModal}=useContext(ModalContext)
    const  {getToken}=useAuth()
    const  {register,handleSubmit,formState:{errors},reset}=useForm({
       defaultValues:{
        username:"",
        link:"",
        password:""
       }
    })

    const handleClose=()=>{
        reset()
        setModal(ModalOptions.NONE)
    }
    const  submitFormQuery=useMutation({
        mutationKey:["submitFormQuery"],
        mutationFn:async    (values)=>{createNewPassword(await getToken()  ,values).then(()=>{
          client.invalidateQueries({
            queryKey:["myPasswords"]
           }) 
           handleClose()
        })}
    }
    )
    const onSubmit=(e)=>{
        console.log(e)
        submitFormQuery.mutateAsync(e)
    }
  return (
   
    modal===ModalOptions.Create? <section    className='inset-0  absolute   backdrop-blur-md    bg-black/40 md:p-0  p-4    grid    grid-cols-1 grid-rows-1 place-items-center  z-[10]'>

        <div    className='lg:w-[30%] w-full rounded-md bg-white  p-6  '>
                <p  className='font-semibold    text-[1.2rem]'>Create a New Password</p>
                <p  className='text-[0.8275rem] text-neutral-400'>Password Information will be encrypted and can only be accessed via your pin.</p>

              <form action=""   onSubmit={handleSubmit(onSubmit)}>
              <input type="text"  className='p-2  w-full  outline-none    border-b-2  border-b-neutral-400/60 h-12    mt-[0.5rem]'   placeholder='Username' {...register("username",{
                required:true
              })
              } />
                <p  className='text-[0.8275rem] text-neutral-400    mt-[0.2rem]'    >This can be the Username or Email</p>
                <p>{errors.username?.message?"This field is Required!":""}</p>
                <input type="text"  className='p-2  w-full  outline-none    border-b-2  border-b-neutral-400/60 h-12    my-[0.5rem]'   placeholder='Password' {...register("password",{
                    required:true
                })} />
                <p>{errors.password?.message}</p>
                <input type="text"  className='p-2  w-full  outline-none    border-b-2  border-b-neutral-400/60 h-12    my-[0.5rem]'   placeholder='URL'  {...register("link")}/>
                <p  className='text-[0.8275rem] text-neutral-400'>The link to the site is also stored for easier access.</p>
                
                
                <p>{submitFormQuery.isError&&submitFormQuery.error}</p>
               <div className='w-full   mt-[3rem] flex  gap-[1rem]  justify-end items-center    p-1 '> <button className='w-32 h-9 shadow rounded-md  text-white  bg-blue-400/60  hover:w-36 transition-all'  onClick={()=>{handleClose()}}    disabled={submitFormQuery.isLoading}>Cancel</button>
                <button className='w-32 h-9 shadow rounded-md  bg-gray-200  hover:w-36  transition-all' type='submit'   disabled={submitFormQuery.isLoading}>Create</button></div>
              </form>
              <p>{submitFormQuery.isError&&submitFormQuery.error}</p>


        </div>

    </section>:<></>
   
  )
}
