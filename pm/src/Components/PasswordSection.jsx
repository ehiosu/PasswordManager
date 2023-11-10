import React, { Children, memo, useContext, useEffect, useState } from 'react'
import { PasswordCard, SharedPasswordCard } from './PasswordCard'
import ModalContext, { ModalOptions } from './ModalContext'


import { useAuth } from '@clerk/clerk-react'
import { useQuery,useQueryClient } from 'react-query'
import {getUserCreatedPasswords, getUserSharedPasswords}from    '../functionality.js'


export const PasswordSection = () => {
    const[section,setSection]=useState(true)
    const {setModal}=useContext(ModalContext)
    const  {userId,getToken}  =useAuth()
    const[userPasswords,setUserPasswords]=useState([])
    const [sharedPasswords,setSharedPasswords]=useState([])
    const queryClinet=useQueryClient()
    const  myPasswordsQuery=useQuery({
    queryKey:"myPasswords",
    queryFn:async()=>getUserCreatedPasswords(userId,await getToken()).then((resp)=>{
        
        setUserPasswords(resp['passwords'])
        return  resp
    }),
    })
    const  sharedPasswordsQuery=useQuery({
        queryKey:"sharedPasswords",
        queryFn:async()=>getUserSharedPasswords(userId,await getToken()).then((resp)=>{
            
            setSharedPasswords(resp['passwords'])
            return  resp
        }),
        })
    const handleSearch=async(value)=>{
        const _userPasswords=await  queryClinet.getQueriesData('myPasswords')[0][1].passwords
        const _sharedPasswords=await  queryClinet.getQueriesData('sharedPasswords')[0][1].passwords
        console.log(_userPasswords,_sharedPasswords)
        if(value===''){
            setUserPasswords((state)=>_userPasswords)
            setSharedPasswords((state)=>_sharedPasswords)
            return;
        }
        
        let owned=_userPasswords.filter((password)=>password.url.includes(value))
        let shared=_sharedPasswords?sharedPasswords.filter((password)=>password.url.includes(value)):[]
        setUserPasswords(owned)
        setSharedPasswords(shared)

    }
  return (
    <section    className='nd:w-[70%]   w-[90%]  mx-auto   h-auto  my-2    '>
      
        <div className="absolute    w-10 h-10 rounded-full    bg-blue-700 left-[20px]  top-[50%]  flex  items-center    justify-center  aspect-square   hover:scale-110 transition-all   duration-300   hover:font-bold hover:shadow-md hover:shadow-blue-400   z-[5]">
            <i  className='bi   bi-plus w-full  h-full  flex    items-center   justify-center   text-[30px] text-white  ' onClick={()=>{setModal(ModalOptions.Create)}}></i>
        </div>
        <div className="relative  w-full  md:w-[60vw]   h-10 mx-auto ">
            <input type="text" name=""  className='w-full   h-full  rounded-[3rem]    outline-none  pl-[50px]   text-[12px]' id=""    placeholder='Search for a stored url e.g Udemy.com '  onChange={(e)=>{handleSearch(e.target.value)}}/>
            <i class="bi bi-search absolute left-[20px] top-[6px]  text-neutral-400    " ></i>
        </div>

        <div    className='lg:w-[50%]   md:w-[80%]  w-full    mx-auto overflow-hidden outine'>
            <div className="flex  justify-center   items-center h-12    w-full gap-4 md:gap-8   whitespace-nowrap">
                <button className={`border-b-2 ${section===true?'border-blue-700   outline-none hover:rounded-lg   hover:border-b-4 transition-all  hover:font-semibold':'text-neutral-400  border-b-2  border-b-gray-400'}  border-0    p-2 w-48    text-[14px] ` }   onClick={()=>{setSection((state)=>true)}}>
                    Your Passwords
                </button>
                <button className={`border-b-2 ${section===false?'border-blue-700   outline-none hover:rounded-lg   hover:border-b-4 transition-all  hover:font-semibold':'text-neutral-400  border-b-2  border-b-gray-400'}  border-0    p-2 w-48     text-[14px]`    }   onClick={()=>setSection((state)=>false)}>
                    Shared Passwords
                </button>
             
            </div>

            <div className={`flex    w-[200%]  md:gap-0 gap-4     my-2    h-[70vh] p-2 relative   ${section===true?'left-0':'md:left-[-100%] left-[-100%]'} transition-all duration-500  overflow-y-auto `}>
                <div    className={`   w-[100%] grid grid-cols-1 grid-rows-1 place-items-center`  }>
                
                   {
                    myPasswordsQuery.isSuccess&& <YourPasswordSection    passwords={userPasswords}/>
                   }{
                    myPasswordsQuery.isLoading  &&  <p>Loading Passwords</p>
                   }
                   {
                    myPasswordsQuery.isError    && <p>{myPasswordsQuery.error.message}</p>
                   }
                </div>
                <div    className={`w-[100%]   grid grid-cols-1 grid-rows-1 place-items-center `}>
                        {/* <SharedPasswordSection  passwords={displayedPasswords.shared}/> */}
                        {
                            sharedPasswordsQuery.isSuccess&&  <SharedPasswordSection   passwords={sharedPasswords} />

                        }
                        {
                            sharedPasswordsQuery.isError&&  <p>{sharedPasswordsQuery.error.message}</p>
                        }
                        {
                            sharedPasswordsQuery.isLoading  &&  <p>Loading-passwords</p>
                        }
                </div>

            </div>

        </div>

    </section>
  )
}

const YourPasswordSection=memo(({passwords})=>{
    
    return( 
        <section className="w-full h-full   ">
           {
            passwords.length    >  0    && passwords.map((password)=>{
                return <PasswordCard key={password.id}  data={{owner:'me',url:password.url,id:password.id,username:password.username}} />
             })
           }
          {
            passwords.length==0&& <p   className='w-full   h-full  grid    place-items-center  text-[0.8275rem]  text-neutral-400   font-bold'>You've created no passwords</p>
          }
        </section>
    )
}, (prevProps, nextProps) => {
    return prevProps.passwords === nextProps.passwords;
  })

const SharedPasswordSection=({children,passwords})=>{
    return( 
        <section className="w-full h-full">
             {
                passwords.length    >0  &&passwords.map((password)=>{
                    return<SharedPasswordCard  key={password.id}  data={{'owner':password.user.username,'url':password.url,'username':password.username,id:password.id,image:password.user.imageUrl}}/>
                })
             }
              {
            passwords.length==0&& <p   className='w-full   h-full  grid    place-items-center  text-[0.8275rem]  text-neutral-400   font-bold'>No passwords have been shared with you.</p>
          }
        </section>
    )
}
