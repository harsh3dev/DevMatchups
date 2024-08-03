"use client"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import SignupForm from './SignupForm'
import Lottie from "lottie-react";
import Footer from '../Footer/Footer'
import SIgnupAnimation from "@/app/assets/Signup.json"

const page = () => {
    return (
        <div className=' min-h-screen text-text bg-background dark:bg-background dark:text-text relative flex flex-col justify-between '>
            <Navbar />
            <div className='grid place-items-center'>
                <SignupForm />
            </div>
            <Footer />
        </div>
    )
}

export default page
