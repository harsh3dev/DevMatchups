"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator'

import { ModeToggle } from './ModeToggle'
import { ProfileIcon } from './ProfileIcon'
import UserAvatar from './UserAvatar'

import { RiAccountBoxFill, RiMenu3Line } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { GoCodescan } from "react-icons/go";
import { FaCodeBranch } from "react-icons/fa6";
import { TbUserSearch } from "react-icons/tb";
import { IoLogoGithub, IoMdLogOut } from 'react-icons/io'
import { MdDashboard, MdEmail } from 'react-icons/md'

import Logo from '@/app/assets/Devmatchups.svg'


const Navbar = () => {
    const {data : session , status} = useSession();
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
        }
    ] as const;
    const navItems = [
        {
            name: "Explore Hackathons",
            path: "/hackathons",
        },
        {
            name: "Explore Teams",
            path: "/teams",
        },
        {
            name: "Find Members",
            path: "/findmember",
        },
    ]
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <header className='w-full relative p-5 text-center '>
            <div className=" fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600  backdrop-blur-xl ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse" >
                        <div className=' w-10 h-10 grid place-items-center p-1 '>
                            <Image src={Logo} alt="Dev Matchups" width={20} height={20} className=' w-full h-full object-cover ' />
                        </div>
                        
                        <span className="self-center text-lg lg:text-2xl font-semibold whitespace-nowrap dark:text-white">Dev Matchups</span>
                    </Link>

                        {/* DESKTOP NAVIGATION BAR */}
                        <nav className="items-center justify-between hidden w-full md:flex md:w-auto " id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.path} className={`block py-2 px-3 text-text rounded text-sm  md:hover:text-accent md:p-0 md:dark:hover:text-accent dark:text-white  `} aria-current="page"
                                        style={{ color: pathname === item.path ? "var(--accent)" : "" }}
                                        key={`list-${item.name}`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className=" hidden md:flex justify-between gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    { status==='unauthenticated' &&
                        <div className='flex justify-center items-center gap-2'>
                        
                        <Button className='bg-primary hidden lg:inline-block hover:bg-accent dark:bg-secondary dark:hover:bg-accent text-white dark:text-white font-semibold ' >
                            <Link href={"/signup"}>
                                Get Started
                            </Link>
                        </Button>

                        <Button variant={"ghost"} className=' group dark:hover:bg-accent hover:bg-accent hover:text-white ' >
                            <Link href={"/login"} className='text-accent rounded-lg border border-accent p-2 lg:text-text lg:border-0 group-hover:text-white ' >
                                Login
                            </Link>
                        </Button>
                        </div>
                    }
                        <div className='flex justify-center items-center gap-4'>
                        <ModeToggle />
                            
                        {status==='authenticated' && session && <ProfileIcon />}
                        </div>
                    </div>
                        

                    {/* MOBILE NAVIGATION SIDEBAR */}
                <div className='flex justify-center md:hidden items-center gap-5'>
                    <div className='md:hidden'>
                        <ModeToggle />
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                {/* <MenuIcon className="h-6 w-6 text-muted-foreground" /> */}
                                {
                                    status==='authenticated' && session && <UserAvatar />
                                }
                                {
                                    status==='unauthenticated' && <RiMenu3Fill className='sm:w-8 sm:h-8 w-6 h-6 ' />
                                }
                                
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-background">
                            <div className="flex h-16 lg:hidden items-center justify-start gap-4 px-4">
                                {
                                    status==='authenticated' && session && <UserAvatar />
                                }
                                <h1 className='text-xl'>
                                    {session?.user?.name}
                                </h1>
                            </div>

                            {
                                status==='authenticated' && session &&
                                <>
                                <div className=' w-full flex flex-col justify-center items-center gap-2 mb-2 '>
                                    <Link href={`/dashboard/profile`} className="w-full flex justify-start items-center gap-4 border border-gray-600 dark:border-gray-800 rounded-md p-4 ">
                                        <span> <RiAccountBoxFill /> </span>
                                        <span> My Profile </span>
                                    </Link>

                                    <Link href={`/dashboard`} className="w-full flex justify-start items-center border gap-4 border-gray-600 dark:border-gray-800 rounded-md p-4 ">
                                        <span> <MdDashboard /> </span>
                                        <span> Dashboard </span>
                                    </Link>
                                </div>

                            <Separator className=' bg-text dark:bg-text '  />
                            </>
                            }
                            { status==='unauthenticated' &&
                            <div className=' flex flex-col gap-4 '>
                            <div className=" flex  md:hidden justify-center gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                
                                <Button className=' w-full bg-accent hover:bg-primary dark:bg-accent dark:hover:bg-secondary text-white dark:text-white font-semibold ' >
                                    <Link href={"/signup"}>
                                        Get Started
                                    </Link>
                                </Button>

                                <Button variant={"ghost"} className='w-full outline outline-1 outline-accent' >
                                    <Link href={"/login"} >
                                        Login
                                    </Link>
                                </Button>
                            </div>
                            <Separator className=' bg-text dark:bg-text '  />
                            </div>
                            }
                                <nav className="grid gap-4 px-4 py-6">
                                    {
                                        navLinks.map((item, index) => (
                                            <React.Fragment key={`index-${index}`}>
                                                <Link
                                                    href={item.link}
                                                    className="group flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                                                    prefetch={false}
                                                    key={index}
                                                >
                                                    {item.icon}
                                                    <span className='text-text dark:text-text transition-all ease-linear'
                                                        style={{ color: pathname === item.link ? "var(--primary)" : "" }}
                                                        key={item.title}
                                                    >{item.title}</span>
                                                </Link>
                                            </React.Fragment>
                                        ))
                                    }
                                </nav>
                                <Separator className=' bg-text dark:bg-text mb-6 '  />
                        <div className=' w-full flex flex-col gap-2 items-center justify-center'>
                            <div className=' w-full flex items-center justify-center gap-2 '>
                                <Link href="/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className=' flex justify-center items-center gap-2 w-full ' >
                                        <IoLogoGithub />
                                        Github
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" className=' flex justify-center items-center gap-2 w-full ' >
                                        <MdEmail />
                                        Support
                                    </Button>
                                </Link>
                            </div>

                            { status==='authenticated' && session && 
                            <Button onClick={handleLogout} variant="destructive" className=' w-full flex justify-center items-center gap-2 ' >
                                Logout
                                <IoMdLogOut />
                            </Button>}
                        </div>
                            
                        </SheetContent>
                    </Sheet>
                </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
