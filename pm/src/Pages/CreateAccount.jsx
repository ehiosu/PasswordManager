import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { createUserAccount } from "../functionality";
import { useNavigate } from "react-router-dom";

export const Staging = () => {
    const nav=useNavigate()
  const getRandomPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isLeft = Math.random() < 0.5; // Randomly choose left or right
    const randomX = isLeft ? 0 : screenWidth - 13 * 16;
    const randomY = Math.floor(Math.random() * (screenHeight - 13 * 16)); // 52 is the height of the element
    return { x: randomX, y: randomY };
  };

  function updatePosition(selector) {
    const element=document.querySelector(`${selector}`)
    const randomPosition = getRandomPosition();
    element.style.top = `${randomPosition.y}px`;
    element.style.left = `${randomPosition.x}px`;
  }

  // Function to update positions of all div elements
  function updateAllPositions() {
    updatePosition(".div1");
    updatePosition(".div2");
    updatePosition(".div3");
    updatePosition(".div4");
  }
  setInterval(updateAllPositions, 4000);
  const {user}=useUser()
  const {getToken}=useAuth()
  const {id,imageUrl,username,primaryEmailAddress:{emailAddress}}=user
  
  console.log(id,imageUrl,username,emailAddress)
  const createAccount =async()=>{
   const res= createUserAccount({userId:id,imageUrl,username: username || emailAddress},await getToken())
   res.then((data)=>{
        setTimeout(()=>{
            nav('/Dashboard')
        },1500)
   })
  }

  useEffect(()=>{
    createAccount()
  },[])

  return (  
    <div className="bg-neutral-100 w-full h-screen grid place-items-center relative">
      <div className="w-[40%] h-[50%] flex flex-col items-center ">
        <div className="animate-pulse ">
          {/* <img
            src="https://res.cloudinary.com/dpxuxtdbh/image/upload/v1702029163/private/Default_vector_black_and_white_illustration_padlock_smiley_0_e584e09c-1501-4bf1-968e-15e9f87c9dbd_0-removebg-preview_fufdgo.png"
            className="object-contain w-48  aspect-square test"
            alt=""
          /> */}
          <i class="bi bi-lock text-[3rem]"></i>
        </div>
        <p className=" text-[1.2rem] font-thin">
          Hold on,we're getting things sorted for you...
        </p>
      </div>
      <div className="absolute bg-green-200/70 blur-md rounded-full w-52 aspect-square transition-all duration-1000 div1 left-56 top-12 test" />
      <div className="absolute bg-blue-200/70 blur-md rounded-full w-52 aspect-square transition-all duration-1000 div2 left-64 top-2/3 test" />
      <div className="absolute bg-purple-200/70 blur-md rounded-full w-52 aspect-square transition-all duration-1000 div3 top-64 left-28 test" />
      <div className="absolute bg-pink-200/70 blur-md rounded-full w-52 aspect-square transition-all duration-1000 div4 top-52 left-2/3 test" />
    </div>
  );
};
