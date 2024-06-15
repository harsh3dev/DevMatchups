"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'
import { FaAngleDown } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
                        <Button className='bg-primary dark:bg-secondary hover:bg-secondary dark:hover:bg-primary hover:ring-2 ring-offset-1 text-white dark:text-white font-semibold ' >
                            <Link href={"/signup"}>
                                Get Started
                            </Link>   
                        </Button>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <span className="text-blue-700 hover:text-white dark:text-white border border-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-blue-600 dark:hover:bg-blue-700 mr-2 transition-colors ease-in-out flex items-center justify-center gap-1 "> Login/Signup <FaAngleDown /> </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                
                                <DropdownMenuItem>
                                    <Link href={"/signup"} className="text-blue-700 hover:text-white dark:text-white border border-blue-700 hover:bg-blue-600 font-medium w-full text-sm px-4 py-2 text-center dark:border-blue-600 dark:hover:bg-blue-700 mr-2 transition-colors ease-in-out ">
                                        Signup
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/login"} className="text-blue-700 hover:text-white dark:text-white border border-blue-700 hover:bg-blue-600 font-medium w-full text-sm px-4 py-2 text-center dark:border-blue-600 dark:hover:bg-blue-700 mr-2 transition-colors ease-in-out ">
                                        Login
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                        <ModeToggle />
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path} className={`block py-2 px-3 text-text rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-accent md:p-0 md:dark:hover:text-accent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent `} aria-current="page"
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
