"use client"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import SignupForm from './SignupForm'
import Lottie from "lottie-react";
import Footer from '../Footer/Footer'
import SIgnupAnimation from "@/app/assets/Signup.json"

const page = () => {
  return (
    <div className=' min-h-screen text-black dark:bg-gray-900 dark:text-white relative flex flex-col justify-between bg-gradient-to-t from-cyan-100 to-neutral-100 dark:bg-gradient-to-t dark:from-indigo-800 dark:to-slate-800  '>
      <Navbar />
      <div className='grid md:grid-cols-2'>
        <div className='left-image bg-background hidden md:block p-10 ' >
          <h1 className=' w-full text-xl lg:text-2xl mt-5 font-extrabold text-center '>
            Create an account to match with developers worldwide!
          </h1>
          <div className=' w-full -mt-10'> <Lottie animationData={SIgnupAnimation} loop={true} /> </div>
        </div>
        <SignupForm />

      </div>
        
      <Footer />
    </div>
  )
}

export default page
