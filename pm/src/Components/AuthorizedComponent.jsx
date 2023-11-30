import React, { useContext,  useEffect,  useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ModalContext, { ModalOptions } from './ModalContext'
import { useForm } from 'react-hook-form'
import { GetAuthorization } from '../functionality'
import { useAuth } from '@clerk/clerk-react'
import { PasswordField } from './PasswordField'

export const AuthorizedComponent = ({children,modalOption,retrievePassword}) => {
    const {modal,setModal,selectedPassword}=useContext(ModalContext)
    const  [hasAccess,setHasAccess]=useState(false)
    const  {getToken}=useAuth()
    const  queryClient=useQueryClient()
    const [error,setError]=useState(null)
    const AccessQuery=useMutation({
        mutationKey:["handleAuthorization"],
        mutationFn:async(values)=>{GetAuthorization(selectedPassword.id,await getToken() ,values,retrievePassword).then((resp)=>{
            queryClient.setQueryData('decryptedData',resp   )
            setHasAccess(true)
            return resp
        }).catch((err)=>{
            setError(err.message=="Request failed with status code 401"?"Wrong Pin!":err.message)
        })},
        onError:(err)=>{
            console.log(err)
        }
    })  

    const  decryptedDataQuery=useQuery({
        queryKey:"decryptedData",
        queryFn:()=>test,
        enabled:false
    })

  return (
   
       
   modal!==ModalOptions.NONE?modal===modalOption?
         <div className="inset-0 top-0   left-0 bg-black/40 backdrop-blur-md    absolute    z-[20]   flex   items-center    justify-center    ">
       { !decryptedDataQuery.data ? <div>
        <InputForm  setModal={setModal} modal={modal}   modalOption={modalOption}  query={AccessQuery} error={error}/>
        
    </div>  :children
        
       }   </div>
  
        :<></>
        :<></>
       
  
  )
}


const InputForm=({query,setModal,modal,modalOption,error  })=>{
    const  client=useQueryClient()
    const containerRef=useRef()
    const {register,formState,handleSubmit}=useForm({
        defaultValues:{
            "pin":""
        }
    })

    const  handleClose=()=>{
        setModal(ModalOptions.NONE)
    }

    const onSubmit=async(values)=>{
        // console.log(values)
       const  results=await query.mutateAsync(values)
    client.setQueryData('decryptedData',results)
        
    }
    return(
        <div    className='lg:w-[30vw] md:w-[50vw]   w-[80vw] h-[40vh]    p-3 bg-white    relative    rounded-md  flex    flex-col'  ref={containerRef}  >
            <i  className='bi   bi-x  absolute  top-2   right-2  text-[1.2rem]   font-semibold  '    onClick={()=>{handleClose()}}></i>
            <p  className='font-semibold    text-[1.2rem]'>Enter Your Pin</p>
            <p  className='text-[0.7275rem] text-neutral-400'>This Pin Grants you access to view or edit the password you clicked on.</p>
<form action="" className='flex    flex-col   flex-1'   onSubmit={handleSubmit(onSubmit)}>
    
<PasswordField  placeholder='Pin' id={'Pin'} register={register("pin",{
                required:"Pin is Required!"
            })}   className='w-full h-12  px-4    outline-none  focus:border-2    rounded-md  transition-all  mt-4   ease-out focus:border-gray-400   border-b-2  border-b-gray-400/40'/>
            <p className="text-xs   text-neutral-400    font-semibold   my-2">Don't Share Your pin with anyone</p>
            <p  className='w-max    p-1 mx-auto text-red-400/70'>{formState.errors.pin?.message}</p>
            <p  className='w-max    p-1 mx-auto text-red-400/70'> {error&& error}</p>

            <button    type='submit' className='w-full   h-10  bg-blue-400/40 mt   text-white   rounded-md   hover:bg-blue-400   transition-colors   hover:font-semibold mt-auto'>Submit</button>
</form>
        </div>
    )
}