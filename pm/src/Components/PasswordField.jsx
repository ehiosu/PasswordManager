import React, { useRef } from 'react'

export const PasswordField = ({register,className,placeholder,id,ref,defaultValue}) => {

  
    const toggleView=()=>{
        const element=document.querySelector(`.${id}`)
        console.log(element)
        element.type = element.type=='password'?'text':'password'
    }
  return (
    <div className={` relative ${className} `} >
        <input type="password" className={`w-full h-full outline-none ${id}`} ref={ref} placeholder={placeholder}   defaultValue={defaultValue} {...register} />
        <i className='bi bi-eye absolute z-10 right-2 top-1/2 -translate-y-1/2 inline bg-white   text-lg' onClick={()=>toggleView()}></i>
    </div>
  )
}
