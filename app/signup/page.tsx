"use client"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import SignupForm from './SignupForm'
import Footer from '../Footer/Footer'

const page = () => {
  return (
    <div className=' min-h-screen text-black dark:bg-gray-900 dark:text-white relative flex flex-col justify-between bg-gradient-to-t from-cyan-100 to-neutral-100 dark:bg-gradient-to-t dark:from-indigo-800 dark:to-slate-800  '>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}
      <Navbar />

      <div className='w-full mb-[15.5rem]  '>
      <SignupForm />
      </div>
        
      <Footer />
    </div>
  )
}

export default page
