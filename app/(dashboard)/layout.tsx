import React from 'react'
import Navbar from "@/app/Navbar/Navbar";
import Footer from "@/app/Footer/Footer";

const DashboardLayout =({ children }:{ children:React.ReactNode })=>{
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between bg-background ">
      <Navbar/>
      {children}
      <Footer/>
    </main>
  )
}

export default DashboardLayout
