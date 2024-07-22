import React from 'react'
import Sidebar from './Sidebar'
import { RiMenu2Line } from "react-icons/ri";
import { ModeToggle } from '../Navbar/ModeToggle';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { Button } from '@/components/ui/button';
import { IoLogoGithub } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';

const Layout =({ children }:{ children:React.ReactNode })=>{
  return (
    <main className=" min-h-screen flex flex-col md:flex-row justify-start items-start gap-5 bg-background dark:bg-[#050b12] p-2 md:p-5 ">
      <div className='hidden md:block '>
        <Sidebar />
        <div className=' w-full flex flex-col gap-2 items-center justify-center mt-5 '>
          <div className=' w-full flex items-center justify-center gap-2 '>
            <Button variant="outline" className=' flex justify-center items-center gap-2 w-full border-gray-800 ' >
              <IoLogoGithub />
              Github
            </Button>
            <Button variant="outline" className=' flex justify-center items-center gap-2 w-full border-gray-800 ' >
              <MdEmail />
              Support
            </Button>
          </div>
          <Button variant="ghost" className=' w-full flex justify-center items-center gap-2 bg-transparent border border-gray-800 ' >
            Logout
            <IoMdLogOut />
          </Button>
        </div>
      </div>

      <div className='w-full min-h-[40px] flex justify-between items-center md:hidden px-5 py-2 '>
        
        <Link href={`/`} className='text-xl font-bold'>
          DevMatchups
        </Link>
        <div className='flex items-center justify-center gap-5'>
        {/* <RiMenu2Line className=' w-6 h-6 ' /> */}
        <ModeToggle/>
        <MobileNav/>
        </div>
      </div>
      
      {children}
    </main>
  )
}

export default Layout
