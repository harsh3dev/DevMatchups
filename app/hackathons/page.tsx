import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


const page = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between bg-background ">
      <Navbar/>
      Coming Soon
      <Footer/>
    </main>
  )
}

export default page
