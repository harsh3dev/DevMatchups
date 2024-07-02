"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'

import { Button } from '@/components/ui/button'

const Navbar = () => {

    const navItems = [
        {
            name: "Explore Hackathons",
            path: "/hackathons",
        },
        {
            name: "Find Teams",
            path: "/findteam",
        },
        {
            name: "Find Team Members",
            path: "/findmember",
        },
    ]
    const pathname = usePathname();

    return (
        <div className='w-full relative p-5 text-center'>
            <nav className="bg-background dark:bg-background fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse" >
                        <div className='h-8 rounded-full bg-sky-800'></div>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dev Matchups</span>
                    </Link>

                    <div className="flex justify-between gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Button variant={"ghost"} >
                            <Link href={"/login"} >
                            Login
                        </Link>
                        </Button>
                        <Button className='bg-accent hover:bg-primary dark:bg-accent dark:hover:bg-secondary text-white dark:text-white font-semibold ' >
                            <Link href={"/signup"}>
                                Get Started
                            </Link>   
                        </Button>
                        <ModeToggle />
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path} className={`block py-2 px-3 text-text rounded md:hover:text-accent md:p-0 md:dark:hover:text-accent dark:text-white  `} aria-current="page"
                                        style={{ color: pathname === item.path ? "var(--accent)" : "" }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
