"use client"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import SignupForm from '@/app/signup/SignupForm'
import Footer from '../Footer/Footer'
import LoginForm from './LoginForm'

const page = () => {
  return (
    <div className=' min-h-screen text-text dark:bg-background dark:text-text relative flex flex-col justify-between bg-gradient-to-t from-cyan-100 to-neutral-100 dark:bg-gradient-to-t dark:from-indigo-800 dark:to-slate-800 '>
      <Navbar />
      <div className='grid grid-cols-2'>
        <div className='left-image bg-gray-700 ' >
        </div>
        <LoginForm />
      </div>
      <Footer />
    </div>
  )
}

export default page
