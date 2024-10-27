"use client"
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { ModeToggle } from '../Navbar/ModeToggle';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { useSession } from "next-auth/react"
import { useAppDispatch } from '@/lib/store/hooks';
import { fetchUser } from '@/lib/store/features/userSlice/userSlice';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const Layout =({ children }:{ children:React.ReactNode })=>{
    const {data : session, status: loading} = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session?.user?.id) {
        dispatch(fetchUser({ userId: session.user.id, email: session.user.email as string }));
        }
    }, [dispatch, session]);

    return ( <div className=' w-full min-h-screen flex flex-col justify-between '>
            <div className=' hidden m-0 md:mb-10 md:block w-full '>
                <Navbar />
            </div>
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
            <Footer/>
        </div>
    )
}

export default Layout
