import React from 'react'
import Footer from "@/app/Footer/Footer";

const Random =({ children }:{ children:React.ReactNode })=>{
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background ">
      {children}
      <Footer/>
    </main>
  )
}

export default Random
