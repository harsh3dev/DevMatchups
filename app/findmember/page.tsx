import React from 'react'
import Form from './Form/Form'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const page = () => {
  return (
    <div className=' min-h-screen text-black dark:bg-background bg-background dark:text-white relative '>
      <Navbar/>
      <Form/>
      <Footer/>
    </div>
  )
}

export default page
