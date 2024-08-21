'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link';

import { MdBugReport, MdOutlineAlternateEmail } from "react-icons/md";
import { FaBusinessTime, FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdModeEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

import UserImage from './UserImage'
import Capsule from './Capsule';
import { Skeleton } from '@/components/ui/skeleton';

import { fetchUser, selectUser } from '@/lib/store/features/userSlice/userSlice';
import { useAppSelector } from '@/lib/store/hooks';
import EditProfile from './EditProfile';



const Page = () => {
    const {data : session, status: loading} = useSession();
    const user = useAppSelector(selectUser);

    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        image: user.image,
        userName: user.username,
        githubURL: user.githubURL,
        linkedinURL: user.linkedinURL,
        portfolio: user.portfolio,
        skills: user.skills,
        bio: user.bio,
        role: user.role,
        experience: user.experience,
    });

    useEffect(()=>{
        setUserData({
            name: user.name,
            email: user.email,
            image: user.image,
            userName: user.username,
            githubURL: user.githubURL,
            linkedinURL: user.linkedinURL,
            portfolio: user.portfolio,
            skills: user.skills,
            bio: user.bio,
            role: user.role,
            experience: user.experience,
        })
        console.log(userData);
        
    },[user, loading])

    return (
        <div className='w-full h-full md:h-[95vh] p-5 bg-[#ebf8fb] dark:bg-[#03070C] border border-gray-700/80 dark:border-gray-500/80 flex flex-col justify-start items-start gap-5 '>
        <div className=' w-full lg:min-h-[200px] bg-gradient-to-t from-cyan-400/60 to-cyan-200/80 dark:from-blue-800/80 dark:to-indigo-900/80 rounded-md p-5 '>
        
            <div className=' w-full h-full flex lg:flex-row flex-col justify-between items-center gap-4  '>
                {/* UserImage and Details */}
                <div className=' flex flex-col justify-normal items-start '>
                    {/* Loading UI Start */}
                        {
                            loading === 'loading' && 
                            <div className='flex justify-center items-center gap-5'>
                                <Skeleton  className='w-[100px] h-[100px] grid place-items-center rounded-full ' />
                                <div className=' h-full flex flex-col gap-2 items-start justify-between'>
                                    <Skeleton className='w-[200px] h-6 ' />
                                    <Skeleton className='w-[200px] h-6 ' />
                                </div>
                            </div>
                        }
                        {
                            loading === 'loading' && 
                            <div className='flex justify-start items-center gap-4 mt-4 ml-4 ' >
                                <Skeleton className='w-14 h-8 rounded-full ' />
                                <Skeleton className='w-14 h-8 rounded-full ' />
                                <Skeleton className='w-14 h-8 rounded-full ' />
                            </div>
                        }
                    {/* Loading UI End */}

                        {/* Authenticated User UI */}
                        { loading === 'authenticated' && session &&
                        <div className='flex justify-center items-center gap-5'>
                            <UserImage />
                            <div className=' h-full flex flex-col gap-2 items-start justify-normal lg:justify-start '>
                                <h1 className=' text-base sm:text-xl md:text-2xl font-semibold text-text flex justify-center items-center gap-2 '> {userData.name}</h1>
                                <h1 className=' text-base font-semibold text-text flex justify-center items-center gap-2 '> <MdOutlineAlternateEmail /> {userData.email}</h1>
                                { userData.experience && userData.role &&
                                <div className=' w-full flex justify-start items-center gap-2 mb-4 mt-1 flex-wrap '>
                                    <span className=' rounded-full text-sm flex justify-center items-center gap-1'>
                                    <FaBusinessTime />
                                        {userData.role}
                                    </span>
                                    
                                    <span className=' rounded-full text-sm flex justify-center items-center gap-1'>
                                    <MdBugReport />
                                        {userData.experience}
                                    </span>
                                    
                                </div>
}
                            </div>
                        </div>}

                        { loading === 'authenticated' && session &&
                        <div className='flex justify-start items-center gap-4 mt-4 ml-4 ' >
                            {
                            userData.githubURL ?
                            <Link target='_blank' href={userData.githubURL} className='p-2 rounded-full px-4 border border-text flex justify-center items-center gap-2 dark:hover:bg-cyan-700/50 hover:bg-cyan-400/50 ' >
                                <FaGithub/>
                                <span className='sm:inline-block hidden'> GitHub </span>
                            </Link>
                            :
                            <div className='p-2 rounded-full px-4 border border-gray-700 dark:border-gray-400 flex justify-center items-center gap-2 text-gray-700 dark:text-gray-400 ' >
                                <FaGithub/>
                                <span className='sm:inline-block hidden'> GitHub </span>
                                
                            </div>
                            }
                            {
                            userData.linkedinURL ?
                            <Link target='_blank' href={userData.linkedinURL} className='p-2 rounded-full px-4 border border-text flex justify-center items-center gap-2 dark:hover:bg-cyan-700/50 hover:bg-cyan-400/50 ' >
                                <FaLinkedinIn />
                                <span className='sm:inline-block hidden'>LinkedIn</span>
                                
                            </Link>
                            :
                            <div className='p-2 rounded-full px-4 border border-gray-700 dark:border-gray-400 flex justify-center items-center gap-2 text-gray-700 dark:text-gray-400 ' >
                                <span className='sm:inline-block hidden'>LinkedIn</span>
                                <FaLinkedinIn />
                                
                            </div>
                            }

                            { userData.portfolio ?
                            <Link target='_blank' href={userData.portfolio} className='p-2 rounded-full px-4 border border-text flex justify-center items-center gap-2 dark:hover:bg-cyan-700/50 hover:bg-cyan-400/50 ' >
                                <HiOutlineGlobeAlt />
                                <span className='sm:inline-block hidden'>Portfolio</span>
                                
                            </Link>
                            :
                            <div className='p-2 rounded-full px-4 border border-gray-700 dark:border-gray-400 flex justify-center items-center gap-2 text-gray-700 dark:text-gray-400 ' >
                                <HiOutlineGlobeAlt />
                                <span className='sm:inline-block hidden'>Portfolio</span>
                            </div>
                            }
                                <EditProfile className='text-xs sm:hidden' />
                    </div>}
                </div>

                {/* Edit Profile and Github Connect Button */}
                    <div className=' hidden h-full sm:flex lg:flex-col justify-start items-start gap-4 ' >
                        <EditProfile className='' />

                        { !userData.userName ?
                        <div className='  w-fit px-4 py-2 cursor-pointer font-semibold rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-black flex justify-center items-center gap-2  '>
                            <FaGithub />
                            <span>Connect Github</span>
                        </div>
                        :
                        <div className='  w-fit px-4 py-2 font-semibold rounded-lg bg-gray-500 dark:bg-gray-500 text-gray-200 dark:text-gray-200 flex justify-center items-center gap-2  '>
                            <FaGithub />
                            <span>Github connected</span>
                        </div>
                    }
                    </div>
            </div>
        </div>

        <div className=' w-full h-full rounded-md p-5 border border-foreground dark:border-foreground  '>
            <div className=' w-full flex flex-col justify-between items-start gap-2 '>
                <div className='mb-4 w-full lg:max-w-[50%] '>
                    <h1 className=' text-lg md:text-3xl font-bold mb-5 text-gray-700 dark:text-gray-400 '>Your Skills</h1>
                    <div className=' w-full flex flex-wrap justify-around items-start gap-2 '>
                    {
                        userData.skills?.map((skill, index) => (
                            <Capsule key={index} item={skill} className='border border-accent dark:border-accent hover:bg-none '  />
                        ))
                    }
                    </div>
                </div>
                <div className='my-8 w-full lg:max-w-[70%]  '>
                    <h1 className=' text-lg md:text-3xl font-bold mb-5 text-gray-700 dark:text-gray-400  '>About Me</h1>
                    {
                        loading==='loading' && <Skeleton className=' min-h-[100px] min-w-full rounded-lg ' />
                    }

                    { loading==='authenticated' &&
                    <div className='w-full  gap-2 '>
                        { 
                        userData.bio ? 
                            <p className=' text-base md:text-lg text-text dark:text-white '>{userData.bio}</p>
                            : 
                            <p className=' text-base md:text-lg min-h-[100px] min-w-full border border-dashed border-gray-700 dark:border-gray-500/50 rounded-lg flex justify-center items-center gap-2 text-gray-700 dark:text-gray-500 '><IoIosAddCircleOutline /> Describe something interesting about yourself here!</p> 
                        }
                    </div>}
                </div>
            </div>

        </div>

        </div>
    )
}

export default Page
