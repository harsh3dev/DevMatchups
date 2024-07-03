"use client"
import React, { SVGProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'

import { HiOutlineTicket } from "react-icons/hi2";
import { GoCodescan } from "react-icons/go";
import { FaCodeBranch } from "react-icons/fa6";
import { TbUserSearch } from "react-icons/tb";

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"

import { ProfileIcon } from './ProfileIcon'
import UserAvatar from './UserAvatar'

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
        <header className='w-full relative p-5 text-center '>
            <div className="bg-background dark:bg-background fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse" >
                        <span className="self-center text-lg lg:text-2xl font-semibold whitespace-nowrap dark:text-white">Dev Matchups</span>
                    </Link>

                    <div className=" hidden md:flex justify-between gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                        <Button variant={"ghost"} >
                            <Link href={"/login"} className='text-accent rounded-lg border border-accent p-2 lg:text-text lg:border-0' >
                                Login
                            </Link>
                        </Button>
                        <Button className='bg-accent hidden lg:inline-block hover:bg-primary dark:bg-accent dark:hover:bg-secondary text-white dark:text-white font-semibold ' >
                            <Link href={"/signup"}>
                                Get Started
                            </Link>
                        </Button>
                        <ModeToggle />
                            <ProfileIcon />
                        {/* <div className='hidden md:inline-block '>
                        </div> */}
                    </div>

                    <nav className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path} className={`block py-2 px-3 text-text rounded text-sm lg:text-base md:hover:text-accent md:p-0 md:dark:hover:text-accent dark:text-white  `} aria-current="page"
                                        style={{ color: pathname === item.path ? "var(--accent)" : "" }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* MOBILE NAVIGATION SIDEBAR */}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                {/* <MenuIcon className="h-6 w-6 text-muted-foreground" /> */}
                                <UserAvatar />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-background">
                            <div className="flex h-16 lg:hidden items-center justify-start gap-4 px-4">
                                <UserAvatar />
                                <h1 className='text-xl'>
                                    @harsh3dev
                                </h1>
                                <ModeToggle />
                            </div>
                            <div className=" flex flex-col md:hidden justify-between gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
                            </div>
                            <nav className="grid gap-4 px-4 py-6">
                                <Link
                                    href="/findmember"
                                    className="group flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                                    prefetch={false}
                                >
                                    <TbUserSearch className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                                    <span>Find Team Members</span>
                                </Link>
                                <Link
                                    href="/findteam"
                                    className="group flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                                    prefetch={false}
                                >
                                    <FaCodeBranch className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                                    <span>Find Teams</span>
                                </Link>
                                <Link
                                    href="/hackathons"
                                    className="group flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                                    prefetch={false}
                                >
                                    <GoCodescan className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                                    <span>Explore Hackathons</span>
                                </Link>

                            </nav>
                            
                        </SheetContent>
                    </Sheet>
                </div>
            </div>


        </header>
    )
}

export default Navbar