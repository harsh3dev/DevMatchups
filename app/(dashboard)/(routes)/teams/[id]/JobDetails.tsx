"use client"
import React, { useEffect, useState } from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { notFound, useRouter } from 'next/navigation';
import { RootState } from '@/lib/store/store';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HackathonEntry } from '@/app/(dashboard)/(routes)/findmember/Form/types';
import { IoGitPullRequestSharp } from 'react-icons/io5';
import axios from 'axios';




export default function OldJobDetails({post, applied}: {post: HackathonEntry, applied: ()=>void}) {
    
    function formatDate(inputDate: any): string {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getUTCFullYear();
        return `${day} ${month} ${year}`;
    }
    return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-background ">
            <div className='--outerbox rounded-md border border-gray-700 w-full dark:border-gray-400 max-w-[90%] text-text dark:text-text my-14 p-10 bg-gradient-to-tr from-violet-300 via-violet-200 to-slate-100 dark:from-violet-600 dark:via-indigo-900 dark:to-slate-900 '>
                <h1 className=' font-extrabold text-3xl mb-2 '>
                    {post?.hackathonName} - {post?.teamName}
                </h1>

                <hr className=' border-t border-text' />

                <div className='w-full grid grid-cols-4 mx-auto my-2'>
                    <div className='h-full  col-span-3 mr-2 '>
                        <h1 className='flex justify-start items-center gap-1 text-base text-gray-800 dark:text-gray-300 '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"></path>
                            </svg> There are {2} open applications for this team!</h1>

                        <div className='w-full flex flex-col justify-center items-start gap-2 '>
                            <h1 className='text-2xl my-2 '>Hackathon Details</h1>

                            <h1>Name of the hackathon: <span className='font-extrabold text-xl '>{post?.hackathonName}</span></h1>

                            <div className='w-full flex justify-start items-center gap-3 '>
                                <span className='font-extrabold text-xl '>Mode: {post?.hackathonMode}</span> | <span className=' font-extrabold text-xl  flex justify-center items-center gap-1'>Location: <FaLocationDot /> {post?.location}</span>
                            </div>

                            <h1>Registration Link: <Link  className='text-primary hover:underline hover:underline-offset-1 dark:text-primary transition-all ease-linear' href={post?.regURL || ""}>{post?.regURL}</Link> </h1> 

                           <h1 className='w-full flex justify-start items-center gap-3 ' >Last Date of Registration:<span className=' font-extrabold text-xl  flex justify-center items-center gap-1'>
                                <FaCalendarAlt /> {formatDate(post?.regDate)}
                                </span> 
                            </h1>  

                            <h1>Looking for position: <span className='font-extrabold text-xl '>{post?.role}</span></h1>

                            <h1>Minimum experience level: <span className='font-extrabold text-xl '>{post?.experience}</span></h1>
                            
                            <h1 className='flex items-center justify-start gap-2 flex-wrap '>Required Skills: {post?.skills.map((skill:string, index:number)=>(
                                <span key={index} className='p-2 rounded-full border border-text dark:border-text'>{skill}</span>
                            ))}</h1>
                            
                            <p className='border border-gray-700 dark:border-gray-400 rounded-lg my-3 p-2 mr-1 '>
                                {post?.description}
                            </p>

                        </div>
                        <Button onClick={applied} className='bg-primary  font-medium dark:font-bold transition-colors ease-in-out w-full '>Apply as a teammate</Button>
                    </div>


                    <div className='h-full border-l border-text px-5 py-2 text-lg flex flex-col justify-start gap-5 backdrop-blur-xl  '>
                        <div className='flex items-center justify-start gap-2'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CT</AvatarFallback>
                            </Avatar>
                            <h1 className='text-3xl font-medium text-accent '>
                                {post?.teamName}
                            </h1>
                        </div>
                        <div className='flex flex-col justify-between items-start text-xl  '>
                            <h1>Team Lead Contact</h1>
                            
                            <div className=' w-full flex justify-start items-center gap-2 hover:border hover:border-accent hover:bg-blue-500/30 dark:hover:bg-sky-300/10 transition-all ease-linear p-2 '>
                                <MdAlternateEmail />
                                <Link className='text-primary hover:underline hover:underline-offset-1 dark:text-primary transition-all ease-linear' href={'mailto:harshpandey.tech@gmail.com'}>email@email.com</Link>
                            </div>

                            <div className=' w-full flex justify-start items-center gap-2 hover:border hover:border-accent hover:bg-blue-500/30 dark:hover:bg-sky-300/10 transition-all ease-linear p-2  '>
                                <FaLinkedin />
                                <Link className='text-primary hover:underline hover:underline-offset-1 dark:text-primary transition-all ease-linear' href={'https://www.likedin.com/in/harsh3dev'}> LinkedIn Profile </Link>
                            </div>

                            <div className=' w-full flex justify-start items-center gap-2 hover:border hover:border-accent hover:bg-blue-500/30 dark:hover:bg-sky-300/10 transition-all ease-linear p-2  '>
                                <FaGithub />
                                <Link className='text-primary hover:underline hover:underline-offset-1 dark:text-primary transition-all ease-linear' href="https://www.github.com/harsh3dev"> GitHub Profile </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </main>
    </>
    )
}