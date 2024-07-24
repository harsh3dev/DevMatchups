"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { RiEdit2Fill } from "react-icons/ri";
import { PiGitPullRequestBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { IoLogoGithub } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';

import { ModeToggle } from '@/app/Navbar/ModeToggle'
import { Button } from '@/components/ui/button';
import { BreadcrumbComp } from '../Breadcrumb/BreadcrumbComp';
import { Separator } from '@/components/ui/separator';

const navItems = [
  {
    title: 'Edit Profile',
    icon: <RiEdit2Fill className='w-5 h-5 ' />,
    link: '/dashboard/profile'
  },
  {
    title: 'Application Status',
    icon: <FaCheckCircle className='w-5 h-5 ' />,
    link: '/dashboard'
  },
  {
    title: 'Team Requests',
    icon: <PiGitPullRequestBold className='w-5 h-5 ' />,
    link: '/dashboard/requests'
  }
] as const;

const Sidebar = () => {
  const path = usePathname();
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redirects to the home page after logout
  };
  return (
    <div className='min-w-[350px] bg-[#ebf8fb] dark:bg-[#03070C] border border-gray-700/80 dark:border-gray-500/80  flex flex-col justify-center items-center '>
        <Link href={`/`} className='text-3xl font-bold my-4 mt-8 mx-4 '>
          DevMatchups
        </Link>
        <div className='w-full mx-4 my-2 flex justify-center items-center border border-l-0 dark:border-gray-100/30 border-gray-500 border-r-0 py-4 ' > <BreadcrumbComp /> </div>
      <div className='w-full'>
        {navItems.map((item, index) => (
          <Link href={item.link} key={index} className=' w-full flex justify-start items-center gap-5 text-primary dark:text-primary  hover:bg-blue-500/30 dark:hover:bg-sky-300/10 transition-all ease-linear p-6 '
            style={{ backgroundColor: path === item.link ? "var(--bgActive)" : "",  color: path === item.link ? "var(--text)" : ""  }}
          >
            {item.icon}
            <span className='text-primary dark:text-primary transition-all ease-linear'
              style={{ color: path === item.link ? "var(--text)" : "" }}
            >{item.title}</span>
          </Link>
        ))}
      </div>
      <Separator className=' dark:bg-gray-100/30 bg-gray-500 ' />
      <div className=' w-full flex flex-col gap-2 items-center justify-center p-4 '>
          <div className=' w-full flex items-center justify-center gap-2 '>
            <Button variant="outline" className=' flex justify-center items-center gap-2 w-full bg-gray-3 border-gray-500 dark:border-gray-800 ' >
              <IoLogoGithub />
              Github
            </Button>
            <Button variant="outline" className=' flex justify-center items-center gap-2 w-full bg-gray-3 border-gray-500 dark:border-gray-800 ' >
              <MdEmail />
              Support
            </Button>
          </div>
          <Button onClick={handleLogout} variant="ghost" className=' w-full flex justify-center items-center gap-2 bg-transparent border border-gray-500 dark:border-gray-800 ' >
            Logout
            <IoMdLogOut />
          </Button>
        </div>

        {/* <ModeToggle/> */}
    </div>
  )
}

export default Sidebar
