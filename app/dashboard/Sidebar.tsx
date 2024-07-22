"use client"

import { ModeToggle } from '@/app/Navbar/ModeToggle'
import Link from 'next/link'
import React from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { PiGitPullRequestBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { BreadcrumbComp } from '../Breadcrumb/BreadcrumbComp';

import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Edit Profile',
    icon: <RiEdit2Fill className='w-5 h-5 text-primary ' />,
    link: '/dashboard/profile'
  },
  {
    title: 'Application Status',
    icon: <FaCheckCircle className='w-5 h-5 text-primary ' />,
    link: '/dashboard'
  },
  {
    title: 'Team Requests',
    icon: <PiGitPullRequestBold className='w-5 h-5 text-primary ' />,
    link: '/dashboard/requests'
  }
] as const;

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className='min-w-[350px] bg-[#ebf8fb] dark:bg-background border border-gray-700/80 dark:border-gray-500/80  flex flex-col justify-center items-center '>
        {/* <ModeToggle/> */}
        <Link href={`/`} className='text-3xl font-bold my-4 mt-8 mx-4 '>
          DevMatchups
        </Link>
        <div className='w-full mx-4 my-2 flex justify-center items-center border border-l-0 dark:border-gray-100/30 border-gray-500 border-r-0 py-4 ' > <BreadcrumbComp /> </div>
      <div className='w-full'>
        {navItems.map((item, index) => (
          <Link href={item.link} key={index} className=' w-full flex justify-start items-center gap-5  hover:bg-blue-500/30 dark:hover:bg-sky-300/10 transition-all ease-linear p-6 '
            style={{ backgroundColor: path === item.link ? "var(--bgActive)" : "" }}
          >
            {item.icon}
            <span className='text-primary dark:text-primary transition-all ease-linear'
              style={{ color: path === item.link ? "var(--text)" : "" }}
            >{item.title}</span>
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default Sidebar
