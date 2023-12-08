import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import ModalContext, { ModalOptions } from './ModalContext'
import { removeUserFromPassword, updatePassword } from '../functionality'
import { useAuth } from '@clerk/clerk-react'
import { PasswordField } from './PasswordField'

export const ViewPassword = () => {
    const   queryClient=useQueryClient()
    const [userData,setUserData]= useState(()=>queryClient.getQueriesData('decryptedData')[0][1]) 
    const {register,formState:{errors},handleSubmit,reset}=useForm({
      username:userData.username,
      password:userData.password,
      url:userData.url
    })
    const passwordFieldRef=useRef()
    const {setModal,selectedPassword}=useContext(ModalContext)
    const {getToken}=useAuth()



    const updatePasswordMutation=useMutation({
      mutationKey:"updatePassword",
      mutationFn:async(values)=>updatePassword(selectedPassword.id,await getToken(),values).then((resp)=>{
        queryClient.setQueryData('decryptedData',resp)
        reset({
          username:resp.username,
          password:resp.password,
          url:resp.url
        })
        return resp
      })
    })
    const handleClose=async()=>{
      await queryClient.removeQueries('decryptedData')
      setModal(ModalOptions.NONE)
    }
    const togglePasswordView=()=>{
      if(!passwordFieldRef.current) return
      passwordFieldRef.current.type=passwordFieldRef.current.type==="password"?"text":"password"
    }
    
   

    const onSubmit=(values)=>{
      if(userData.username===values.username && userData.password===values.password &&  userData.url===values.password ){
        handleClose()
        return
      }
      else{
        updatePasswordMutation.mutateAsync(values)
      
      }

    }
  return (
    <section    className='lg:w-[30vw] md:w-[50vw] sm:w-[70vw]  lg:h-[75vh] bg-white  rounded-md    border-r-8  p-4  border-r-blue-400/40   relative    h-[80vh]    w-[90vw]  flex  flex-col'>
        <p  className='font-semibold    text-[1.2rem]'>Password View</p>
        <p  className='text-neutral-400    text-[0.7275rem] lg:text-[0.6275rem]'>Make sure to save any changes</p>
            <i  className='bi   bi-x absolute    top-2  right-2 text-[1.5rem]'  onClick={handleClose}></i>
            <form action="" className='flex flex-col  flex-1' onSubmit={handleSubmit(onSubmit)}>
                <input type="text"  defaultValue={userData.username} className='w-full   h-10    outline-none     border-b-2 border-b-neutral-400/40 rounded-md    text-black  p-2 ' {...register("username",{
                  required:"Can't have the username field empty"
                })}  placeholder='Username'/>
                  <p  className='mb-4 mt-2  text-neutral-400 md:text-[0.8275rem] text-[0.7275rem]'>Username for the password created</p>
                <div  className='w-full h-8 relative '>
                <PasswordField type="password" ref={passwordFieldRef} id={'password'} defaultValue={userData.password} className='w-full   h-full    outline-none     border-b-2 border-b-neutral-400/50 rounded-b-sm    text-neutral-500  px-2    my-2' register={register("password",{
                  required:"Password field is required"
                })}     placeholder='Password'/>
                <i  className={`bi   absolute  top-2/3 -translate-y-2/3 right-2 `}  onClick={()=>{togglePasswordView()}}></i>
                </div>
                <p  className='mt-2 mb-4  text-neutral-400 md:text-[0.8275rem] text-[0.7275rem]'  >Keep this particularly secret</p>
                <input type="text"  defaultValue={userData.url} className='w-full   h-10    outline-none     border-b-2 border-b-neutral-400/40 rounded-md    text-black  p-2 ' {...register("url",{
                  required:"Can't have the URL field empty"
                })}  placeholder='URL'/>
                  <p  className='mb-4 mt-2  text-neutral-400 md:text-[0.8275rem] text-[0.7275rem]'>Link to use the password created</p>
                  <p  className='text-[0.8275rem] text-neutral-400 border-b-2 border-b-neutral-400  py-2  mb-2'>Users You've shared this password with :</p>
                  <UserList users={userData.users} setUserData={setUserData} id={userData.id}/>
                <button className={`w-full bg-blue-400  text-white  mt-auto h-8  `}   disabled={updatePasswordMutation.isLoading}  >Submit Changes</button>
                  
                
            </form> 
            {/* <p>{username}</p> */}
    </section>
  )
}

const UserList=({users,id,setUserData})=>{
  const queryClient=useQueryClient()
  const {getToken}=useAuth()
  const removePerson=async(passwordid,id)=>{
    const response = removeUserFromPassword(passwordid,id,await getToken())
    response.then((resp)=>{
      setUserData(resp['password'])
      queryClient.setQueryData('decryptedData',resp['password'])
      return resp
    }).catch((err)=>{
      console.log(err)
    })
  }
  return(
    <div  className='flex-1 my-2  overflow-y-auto'>
      {users.map((user)=>{
          return  <div  className='w-full h-10 flex items-center gap-2'>
              <img  className='h-full rounded-full aspect-square ' src={user.imageUrl} alt="" />
              <p  className='text-[0.7275rem] font-thin'>{user.username}</p>
              <i className='bi bi-x ml-auto text-[1.2rem] hover:text-red-400 hover:cursor-pointer' onClick={()=>removePerson(id,user.id)}></i>
          </div>
      })}
    </div>  
  )
}


export const ViewSharedPassword=()=>{
  const   queryClient=useQueryClient()
  const {username,id,password,url}=  queryClient.getQueriesData('decryptedData')[0][1]
  const {setModal} =useContext(ModalContext)
  const handleClose=async()=>{
    await queryClient.removeQueries('decryptedData')
    setModal(ModalOptions.NONE)
  }
  return(
    <section    className='lg:w-[30vw]  lg:h-auto bg-white  rounded-md    border-r-8  p-4  border-r-blue-400/40   relative    h-[80vh]    w-[80vw]  flex  flex-col'>
    <p  className='font-semibold    text-[1.2rem]'>Password View</p>
    <p  className='text-neutral-400    text-[0.7275rem] lg:text-[0.6275rem]'>Make sure to save any changes</p>
    <i  className='bi   bi-x absolute    top-2  right-2 text-[1.5rem] hover:cursor-pointer'  onClick={handleClose}></i>
    <div className="flex flex-col my-2  gap-2">
      <p className='text-[1.1rem] font-semibold' >Username:  <span className='text-[0.8275rem] text-neutral-400 '>{username}</span></p>
      <p className='text-[1.1rem] font-semibold' >Password:  <span className='text-[0.8275rem] text-neutral-400 '>{password}</span></p>
      <p className='text-[1.1rem] font-semibold' >Link:  <span className='text-[0.8275rem] text-neutral-400 hover:text-blue-400/40   '>{url}</span></p>




    </div>
    </section>

  ) 
}