"use client"

import Link from "next/link"
import Image from "next/image"

import { FaGithub } from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";


import Logo from '@/app/assets/Devmatchups.svg'
import PoweredByVercel from "./PoweredByVercel";

export default function Footer() {
    return (
        <footer className="w-full border border-t border-r-0 border-b-0 border-l-0 border-gray-500 text-text pt-[0.1rem] bg-background " >
            <div className="container mx-auto px-4 md:px-6 py-8 flex max-md:flex-wrap justify-between items-start lg:items-start gap-8 ">
                <div className=" relative h-fit flex gap-4 md:flex-row flex-col w-full md:w-fit " >
                    <div className="gap-5 flex flex-col justify-between items-start h-full">
                        <Link href='/' className=" flex justify-center items-center gap-4 ">
                            <div className=' w-8 h-8 md:w-10 md:h-10 '>
                                <Image src={Logo} alt="Dev Matchups" width={20} height={20} className=' w-full h-full object-cover ' />
                            </div>
                            <span className=" text-xl lg:text-3xl font-bold">Dev Matchups</span>
                        </Link>
                        <p className="  text-wrap text-base font-medium py-2 ">Team up for success in every hackathon <br/> Build your dream hackathon team with DevMatchups!</p>
                        <h1 className=" text-sm sm:text-lg lg:text-sm text-gray-700/90 dark:text-[#888] " >Created by <Link href={'https://www.linkedin.com/in/harsh3dev/'} target="_blank" className="font-semibold hover:text-accent transition-all ease-linear scale-[0.2] " >Harsh Pandey</Link> & <Link href={'https://www.linkedin.com/in/yash-gupta-64956b246/'} target="_blank" className="font-semibold hover:text-accent transition-all ease-linear scale-[0.2] " >Yash Gupta</Link> </h1>
                        <PoweredByVercel/>
                    </div>
                </div>


                <div className="flex flex-wrap w-full md:w-fit px-5 sm:p-0 justify-between gap-5 sm:gap-20  h-full " >

                    <div className=" flex flex-col justify-between h-full gap-4  ">
                        <h3 className=" text-base md:text-xl font-bold ml-1 ">Contribute</h3>
                        <ul className=" flex flex-col justify-between items-start gap-2 text-gray-200 text-xs md:text-base ">
                            <li>
                                <Link target="_blank" className="flex justify-center items-center gap-2 text-text rounded-md p-1  " href="https://github.com/harsh3dev/DevMatchups" >
                                    <FaGithub className=" w-5 h-5 " />
                                    Star on GitHub
                                </Link>
                            </li>
                            <li>
                                <Link target="_blank" className="flex justify-center items-center gap-2 rounded-md p-1  text-pink-700 dark:text-pink-400 " href="https://github.com/sponsors/harsh3dev" >
                                    <SiGithubsponsors className=" w-5 h-5 " />
                                    Sponsor on GitHub
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className=" flex flex-col justify-between h-full gap-4 ">
                        <h3 className=" text-base md:text-xl font-bold ml-1 ">Contact</h3>
                        <ul className=" flex flex-col justify-between items-start gap-2 text-text text-xs md:text-base ">
                            <li>
                                <Link className="flex justify-center items-center p-1 gap-2 hover:underline underline-offset-4 rounded-md transition-all duration-150 ease-linear  group  " href="mailto:yaahg342@gmail.com" target="_blank">
                                    {/* <MdEmail /> */}
                                    yaahg342@gmail.com
                                    <MdArrowOutward className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-linear " />
                                </Link>
                            </li>
                            <li>
                                <Link className="flex justify-center items-center p-1 gap-2 hover:underline underline-offset-4 rounded-md transition-all duration-150 ease-linear  group  " href="mailto:harshpandey.tech@gmail.com" target="_blank">
                                    {/* <MdEmail /> */}
                                    harshpandey.tech@gmail.com
                                    <MdArrowOutward className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-linear " />
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}
