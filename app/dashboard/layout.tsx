"use client"
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

import { signOut } from 'next-auth/react';

const Layout =({ children }:{ children:React.ReactNode })=>{

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redirects to the home page after logout
  };

  return (
    <main className=" min-h-screen flex flex-col md:flex-row justify-start items-start gap-5 bg-background dark:bg-[#050b12] p-2 md:p-5 ">
      <div className='hidden md:block '>
        <Sidebar />
        
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
