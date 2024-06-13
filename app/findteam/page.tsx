import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const page = () => {
  return (
    <div className=' min-h-screen text-black dark:bg-gray-900 dark:text-white relative '>
      <Navbar/>
      <div className='h-screen' ></div>
      <Footer/>
    </div>
  )
}

export default page
