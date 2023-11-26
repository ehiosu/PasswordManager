
import { useAuth } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '/logo.png'
import group from '/group.jpg'


export const Landing = () => {
  const {isSignedIn}=useAuth()
  const Nav=useNavigate()
  return (
    <main className='lg:h-screen w-full flex  flex-col  relative'>
      <nav  className='absolute z-10 w-full lg:h-16 h-12  flex  justify-between items-center  p-2'>
        <img src={logo}   alt="logo" className='h-full  object-contain p-2' />
      {
        isSignedIn  ? <button className='w-40 p-1  text-white  h-12 shadow-md   border bg-[#515DEF]  mx-2  ' onClick={()=>{
          Nav('/Dashboard')
        }}>Go To Dashboard</button>: <button className='lg:w-40 p-1 w-24 text-white h-8 lg:h-12 shadow-md   border bg-[#515DEF]  mx-2  ' onClick={()=>{
          Nav('/Signin')
        }}>Signin</button>
      }
      </nav>

      <section className="flex flex-1   relative  lg:h-auto   min-h-screen  overflow-x-hidden">
        <div  className='lg:w-[55%] w-full h-full   bg-[#515DEF] px-[5%]  z-[5] relative'>
          <h1 className='mt-28  text-white text-[1.4rem] lg:text-[2rem] font-bold mx-auto'>Welcome to Asseco Pass   <br /> Your Gateway to Effortless Password Management Online</h1>
          <p  className='mt-10  text-neutral-100  leading-loose text-[0.8275rem]   mx-auto text-start lg:block  '>In a world of ever-evolving cyber threats, your digital identity deserves the best protection.  <br /> Meet Asseco Pass, your go-to web application for seamless and secure password management.  <br /> No more memorizing complex strings; Asseco Pass is the key to a secure and stress-free online experience.</p>
          <button className='bg-neutral-100 lg:w-48 lg:h-16 w-40  h-16 text-[1.0275rem]   my-4 text-black flex  justify-center gap-4 items-center  p-2'>Get Started <i  className='bi bi-cursor'></i></button>

          <div className="h-48  rounded-md lg:absolute hidden  lg:bottom-4   lg:left-4  bg-white   w-full lg:w-[80vw]  lg:flex">
              <div className="flex-1 flex flex-col  items-center  gap-2 px-4">
                <i  className='bi bi-cursor text-[2rem]  text-[#515DEF] '></i>
                <p className="font-semibold text-[0.8275rem]">
                One-Click Access
                </p>
                <p  className='text-[0.8275rem] text-neutral-500'>Enjoy the simplicity of one-click access to your accounts. <br />No more typing out lengthy passwords or fumbling with login details.</p>
              </div>
              <div className="flex-1 flex flex-col  items-center  gap-2   px-4">
                <i  className='bi bi-alt text-[2rem]  text-[#1BCFF6] '></i>
                <p className="font-semibold text-[0.8275rem]">
                Intuitive Web Interface
                </p>
                < p className='text-[0.8275rem] text-neutral-500'>Navigate with ease through our user-friendly web interface. <br /> Organize, categorize, and customize your settings effortlessly.</p>
              </div>
              <div className="flex-1 flex flex-col  items-center  gap-2 px-4">
                <i  className='bi bi-key text-[2rem]  text-[#FF872E] '></i>
                <p className="font-semibold text-[0.8275rem]">
                Top-notch Security
                </p>
                <p  className='text-[0.8275rem] text-neutral-500' > Your data is shielded against digital threats,<br /> giving you the confidence to navigate the online world worry-free.</p>
              </div>
           
          </div>
          <div  className='lg:hidden  block  -z-[1] w-[70vw]  aspect-square rounded-full  overflow-hidden absolute  -right-1/4   top-[40%]'>
                <img src={group} alt=""   className='h-full aspect-square'/>

              </div>
          <div  className='lg:hidden  visible flex  flex-col  gap-3 w-full'>
          <div className="flex-1 flex flex-col  items-center  gap-2 px-4  bg-white  h-auto  p-3 rounded-md">
                <i  className='bi bi-cursor text-[2rem]  text-[#515DEF] '></i>
                <p className="font-semibold text-[0.8275rem]">
                One-Click Access
                </p>
                <p  className='text-[0.8275rem] text-neutral-500'>Enjoy the simplicity of one-click access to your accounts. <br />No more typing out lengthy passwords or fumbling with login details.</p>
              </div>

              <div className="flex-1 flex flex-col  items-center  gap-2 px-4  bg-white  h-auto  p-3 rounded-md">
                <i  className='bi bi-alt text-[2rem]  text-[#1BCFF6] '></i>
                <p className="font-semibold text-[0.8275rem]">
                Intuitive Web Interface
                </p>
                < p className='text-[0.8275rem] text-neutral-500'>Navigate with ease through our user-friendly web interface. <br /> Organize, categorize, and customize your settings effortlessly.</p>
              </div>

              <div className="flex-1 flex flex-col  items-center  gap-2 px-4  bg-white  h-auto  p-3 rounded-md">
                <i  className='bi bi-key text-[2rem]  text-[#FF872E] '></i>
                <p className="font-semibold text-[0.8275rem]">
                Top-notch Security
                </p>
                <p  className='text-[0.8275rem] text-neutral-500' > Your data is shielded against digital threats,<br /> giving you the confidence to navigate the online world worry-free.</p>
              </div>
          </div>

         
        </div>
        <img src={group}  className='h-full lg:w-[45%]  lg:visible  lg:block  hidden  object-cover' alt="" />
      </section>
     
    </main>
  )
}
