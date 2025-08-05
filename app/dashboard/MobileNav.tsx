"use client"
import React from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    } from "@/components/ui/accordion"


import UserAvatar from '../Navbar/UserAvatar'

import { RiMenu3Line } from 'react-icons/ri'
import { TbUserSearch } from 'react-icons/tb'
import { FaCodeBranch } from 'react-icons/fa6'
import { GoCodescan } from 'react-icons/go'
import { RiEdit2Fill } from "react-icons/ri";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { PiGitPullRequestBold } from "react-icons/pi";
import { IoLogoGithub, IoMdLogOut } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'

import Link from 'next/link'
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navLinks = [
    {
        title: 'Find Team Members',
        icon: <TbUserSearch className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />,
        link: '/findmember'
    },
    {
        title: 'Find Teams',
        icon: <FaCodeBranch className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />,
        link: '/teams'
    },
    {
        title: 'Explore Hackathons',
        icon: <GoCodescan className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />,
        link: '/hackathons'
    },
    {
        title: 'Favorites',
        icon: <FaStar className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />,
        link: '/favorites'
    }
] as const;

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


const MobileNav = () => {
    const {data : session , status} = useSession();
    const path = usePathname();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    }

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        {/* <MenuIcon className="h-6 w-6 text-muted-foreground" /> */}
                        {
                            status === 'authenticated' && session && <UserAvatar />
                        }
                        {
                            status === 'unauthenticated' && <RiMenu3Line />
                        }

                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background">
                    {status === 'unauthenticated' &&
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
                        </div>}
                    
                    <div className='w-full mt-4 '>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className=' w-full font-extrabold text-xl  '>
                                    Dashboard
                                </AccordionTrigger>
                                <AccordionContent>
                                {navItems.map((item, index) => (
                                    <Link href={item.link} key={index} className=' w-full flex justify-start items-center gap-5 hover:border hover:border-accent hover:bg-blue-500/30 dark:hover:bg-sky-300/10 transition-all ease-linear p-6 '
                                        style={{ backgroundColor: path === item.link ? "var(--bgActive)" : "" }}
                                    >
                                        {item.icon}
                                        <span className='text-primary dark:text-primary transition-all ease-linear'
                                            style={{ color: path === item.link ? "var(--text)" : "" }}
                                            key={index}
                                        >{item.title}</span>
                                    </Link>
                                ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <Separator className=' bg-text dark:bg-text '  />

                    <nav className="grid gap-4 px-4 py-6">
                        {
                            navLinks.map((item, index) => (
                                <Link
                                    href={item.link}
                                    className="group flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                                    prefetch={false}
                                    key={index}
                                >
                                    {item.icon}
                                    <span  className='text-primary dark:text-primary transition-all ease-linear'
                                    style={{ color: path === item.link ? "var(--text)" : "" }}
                                    key={index}
                                    >{item.title}</span>
                                </Link>
                            ))
                        }
                    </nav>

                    <div className=' w-full flex flex-col gap-2 items-center justify-center'>
                        <div className=' w-full flex items-center justify-center gap-2 '>
                            <Button variant="outline" className=' flex justify-center items-center gap-2 w-full ' >
                            <IoLogoGithub />
                            Github
                            </Button>
                            <Button variant="outline" className=' flex justify-center items-center gap-2 w-full ' >
                            <MdEmail />
                            Support
                            </Button>
                        </div>
                        <Button onClick={handleLogout} variant="destructive" className=' w-full flex justify-center items-center gap-2 ' >
                            Logout
                            <IoMdLogOut />
                        </Button>
                    </div>

                </SheetContent>
            </Sheet>
        </>
    )
}

export default MobileNav
