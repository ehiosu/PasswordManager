import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import person1 from '../assets/person1.jpg'
import person2 from '../assets/person2.jpg'
import ModalContext, { ModalOptions } from './ModalContext'
export const PasswordCard = ({data,edit}) => {
    const  {owner,url,shared_with}=data
    const {setSelectedPassword,setModal}=useContext(ModalContext)

  

    const handleView=()=>{
        setSelectedPassword(data)
        setModal(ModalOptions.OVIEW)
        
    }

    const handleShare=()=>{
        setSelectedPassword(data)
        setModal(ModalOptions.SHARE)
        
        
    }
  return (
    <div    className='w-full   h-20 my-2   items-center  flex  justify-between border-b-2  border-b-neutral-400/50 py-2 gap-[]'>
        <div className="  h-full     flex justify-center-center    flex-col   md:px-3 ">
        <p className="text-xs   text-left   text-neutral-400    font-bold   mb-2" >Passowrd Information:</p>
            <div className="flex items-center">
            <p  className='w-10 aspect-square text-[20px]  bg-blue-700 text-white  flex   items-center gap-2   justify-center  shadow-md  rounded-full'   >{owner}</p>
            <a   className='ml-6 '  href={url}><p className='h-full   font-semibold   text-neutral-400    hover:text-blue-400 transition-colors  text-[14px]'><span   className='text-blue-500    '>Link: </span>{url}</p></a>    
            </div>
        </div>
        <div    className=' flex flex-col  border-r-2  border-l-2  border-neutral-400/50  h-full  md:px-3  px-1'>
          
            <div className="flex flex-1 items-center  justify-between  gap-2   mt-2  ">
              <div className="flex items-center gap-4    ">
               <i class="bi bi-eye  text-[16px] hover:scale-125  hover:cursor-pointer   hover:text-blue-700"    onClick={()=>{handleView()}}></i>
               <i class="bi bi-share    text-black      text-[16px] hover:scale-125  hover:cursor-pointer   hover:text-blue-700"    onClick={()=>{handleShare()}}></i>
              </div>
           
            </div>

        </div>
     
    </div>
  )
}



const UserAvatar=({img,name})=>{
    return(
        <div className="relative w-9 aspect-square group  ">
            <img src={img} alt="preson" className='w-full  aspect-square    rounded-full peer   group-hover:hidden' />
            <div    className='absolute w-36    bg-white    border-2    border-blue-700 rounded-md  text-center text-blue-700     h-auto  top-[2px] right-0 hidden  group-hover:block transition-all    text-[12px]'>
                <p>{name}</p>
            </div>
        </div>
    )
}

export const SharedPasswordCard = ({data,edit}) => {
    const {setSelectedPassword,setModal,}=useContext(ModalContext)
    const  {username,url,owner,image}=data

    const handleView=()=>{
        setSelectedPassword(data)
        setModal(ModalOptions.CVIEW)
        
    }
  return (
    <div    className='w-[80%]  mx-auto     my-2   items-center  flex  justify-between border-b-2  border-b-neutral-400/50 p-2 '>
        <div className="w-full   h-full     flex justify-center-center    flex-col">
        <p className="text-xs   text-left   text-neutral-400    font-bold   mb-2" >Passowrd Information:</p>
           <div className="flex items-center">
           <img src={image}  className='h-12    aspect-square   rounded-full'   alt="" />
           <div className="flex     flex-col    items-center    gap-2   ">

           
            <Link   className=' text-[14px] flex   flex-wrap      items-center '  to={url}><p className='h-full   font-semibold   text-neutral-400    hover:text-blue-400 transition-colors  text-[16px] text-start md:ml-0 ml-4    '><span   className='text-blue-500    text-start'>Link: </span>{url}</p></Link>
            <p className='text-[12px]   text-neutral-400    ml-6    text-start' >Creator: {owner}</p>
             </div>  
           
            <i class="bi bi-eye  font-[18px] hover:scale-125  hover:cursor-pointer   hover:text-blue-700    ml-auto"   onClick={()=>{handleView()}}></i>
            
            </div>
        </div>
        
     
    </div>
  )
}

