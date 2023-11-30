import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalContext, { ModalOptions } from './ModalContext'
import { PasswordField } from './PasswordField'
import { changeUserPin } from '../functionality'
import { useAuth } from '@clerk/clerk-react'

export const ChangePinForm = () => {
        const containerRef=useRef()
        const {getToken}=useAuth()
        const [error,setError]=useState(null)
        const {register,formState,handleSubmit}=useForm({
            defaultValues:{
                "currentPin":"",
                "pin":""
            }
        })
        const {setModal,modal}=useContext(ModalContext)
    
        const  handleClose=()=>{
            setModal(ModalOptions.NONE)
        }
    
        const onSubmit=async(values)=>{
           const response=changeUserPin(await getToken(),values)
           response.then(()=>{
            handleClose()
           }).catch((err)=>{
            if(err.message=="Request failed with status code 401")
                {setError("Wrong Pin")}
            else{
                setError(err.message)
            }
           })
            
        }
        return(
           modal==ModalOptions.CPin?<div className='absolute w-full h-screen grid place-items-center left-0 top-0 bg-black/40 '>
                 <div    className='lg:w-[30vw]  w-[80vw] min-h-[40vh]    p-3 bg-white    relative    rounded-md  flex    flex-col'  ref={containerRef}  >
           <i  className='bi   bi-x  absolute  top-2   right-2  text-[1.2rem]   font-semibold  '    onClick={()=>{handleClose()}}></i>
           <p  className='font-semibold    text-[1.2rem]'>Change Your Pin</p>
           <p  className='text-[0.7275rem] text-neutral-400'>This Pin Grants you access to view or edit the password you clicked on.</p>
<form action="" className='flex    flex-col   flex-1'   onSubmit={handleSubmit(onSubmit)}>
<PasswordField  placeholder={'Current Pin'} id={'cpin'} register={register("currentPin",{
               required:"Current pin is Required!"
           })}   className='w-full h-12  px-4    outline-none  focus:border-2    rounded-md  transition-all  mt-4   ease-out focus:border-gray-400   border-b-2  border-b-gray-400/40'/>
        <PasswordField placeholder={'Pin'} id={'pin'} className='w-full h-12  px-4     focus:border-2    rounded-md  transition-all  mt-4   ease-out focus:border-gray-400   border-b-2  border-b-gray-400/40 outline-none' register={register("pin",{
               required:"Pin is Required!"
           })}/>
           <p className="text-xs   text-neutral-400    font-semibold   my-2">Don't Share Your pin with anyone</p>
           <p  className='w-max    p-1 mx-auto text-red-400/70  text-[0.8275rem]'>{formState.errors.pin?.message}</p>
           <p  className='w-max    p-1 mx-auto text-red-400/70  text-[0.8275rem]'>{error&&error}</p>
           

           <button    type='submit' className='w-full   h-10  bg-blue-400/40 mt   text-white   rounded-md   hover:bg-blue-400   transition-colors   hover:font-semibold mt-auto'>Submit</button>
</form>
       </div>
           </div>:<></>
        )
}
