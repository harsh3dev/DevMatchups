"use client"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Lottie from "lottie-react";
import Footer from '../Footer/Footer'
import LoginForm from './LoginForm'
import LoginAnimation from "@/app/assets/Login.json"

const page = () => {
  return (
    <div className=' min-h-screen text-text bg-background dark:bg-background dark:text-text relative flex flex-col justify-between '>
        <Navbar/>
      <div className='grid place-items-center'>
        {/* <div className='left-image bg-background hidden md:block p-10 ' >

          <h1 className=' w-full text-3xl lg:text-5xl mt-5 font-extrabold text-center '>
            Welcome back!
          </h1>
          <div className=' w-full grid place-items-center p-5 mt-5 '> <Lottie animationData={LoginAnimation} loop={true} /> </div>
        </div> */}
        <LoginForm />
      </div>
      <Footer />
    </div>
  )
}

export default page
