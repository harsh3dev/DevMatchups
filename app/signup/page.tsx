import React from 'react'
import Navbar from '../Navbar/Navbar'
import SignupForm from './SignupForm'
import Footer from '../Footer/Footer'

const page = () => {
  return (
    <div className=' min-h-screen text-black dark:bg-gray-900 dark:text-white relative '>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_00px,transparent,#C9EBFF)]"></div></div>
      <Navbar/>
      <SignupForm/>
      <Footer/>
    </div>
  )
}

export default page
