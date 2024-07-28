"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";

import Logo from '@/app/assets/Devmatchups.svg'
import VercelDark from '@/app/assets/vercel-logotype-dark.svg'
import VercelLight from '@/app/assets/vercel-logotype-light.svg'
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full border border-t border-r-0 border-b-0 border-l-0 border-gray-500 text-text pt-[0.1rem] bg-background " >
      <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row justify-between items-start lg:items-start gap-8 ">
        <div className=" relative h-full flex gap-4 " >
          <div className="gap-5 flex flex-col justify-between items-start h-full">
            <Link href='/' className=" flex justify-center items-center gap-4 ">
              <div className=' w-8 h-8 md:w-12 md:h-12 '>
                <Image src={Logo} alt="Dev Matchups" width={20} height={20} className=' w-full h-full object-cover ' />
              </div>
              <span className=" text-xl lg:text-3xl font-bold">Dev Matchups</span>
            </Link>
            <p className="  text-wrap text-lg font-medium py-2 ">Team up for success in every hackathon<br/> Build your dream hackathon team with DevMatchups!</p>
            <h1 className=" text-lg lg:text-sm text-gray-700/90 dark:text-[#888] " >Created by <Link href={'https://www.linkedin.com/in/harsh3dev/'} target="_blank" className="font-semibold hover:text-accent transition-all ease-linear scale-[0.2] " >Harsh Pandey</Link> & <Link href={'https://www.linkedin.com/in/yash-gupta-64956b246/'} target="_blank" className="font-semibold hover:text-accent transition-all ease-linear scale-[0.2] " >Yash Gupta</Link> </h1>
          </div>
        </div>

        <div className="flex flex-wrap justify-normal md:justify-between gap-20 h-full " >
        <div className=" flex justify-between items-center h-full gap-4  ">
          <Link href="https://vercel.com/docs" target="_blank" className=" text-sm md:text-base ">Powered by {"\t"}
            <Image src={VercelDark} height={70} width={60} alt="vercel-dark" className=" dark:hidden inline-block ml-2 " />
          <Image src={VercelLight} height={70} width={60} alt="vercel-light" className=" dark:inline-block hidden ml-2 " />
          </Link>
        </div>
        </div>

        <div className="flex flex-wrap justify-normal md:justify-between gap-20 h-full " >

          <div className=" flex flex-col justify-between h-full gap-4  ">
            <h3 className=" text-lg md:text-2xl font-bold ">Contribute</h3>
            <ul className=" flex flex-col justify-between items-start gap-2 text-gray-200">
              <li>
                <Link target="_blank" className="flex justify-center items-center gap-2 text-text p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600/30  " href="https://github.com/harsh3dev/DevMatchups" >
                  <FaGithub className=" w-5 h-5 " />
                  Star on GitHub
                </Link>
              </li>
              <li>
              <Link target="_blank" className="flex justify-center items-center gap-2 p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600/30  text-pink-700 dark:text-pink-300 " href="https://github.com/sponsors/harsh3dev" >
                  <SiGithubsponsors className=" w-5 h-5 " />
                  Sponsor on GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div className=" flex flex-col justify-between h-full gap-4 ">
            <h3 className=" text-lg md:text-2xl font-bold ">Contact</h3>
            <ul className=" flex flex-col justify-between items-start gap-2 text-text">
              <li>
                  <Link className="flex justify-center items-center gap-2 hover:underline rounded-md hover:bg-gray-300/40 dark:hover:bg-gray-900/30 p-2 " href="mailto:yaahg342@gmail.com" target="_blank">
                    <MdEmail />
                    yaahg342@gmail.com
                  </Link>
              </li>
              <li>
                  <Link className="flex justify-center items-center gap-2 hover:underline rounded-md hover:bg-gray-300/40 dark:hover:bg-gray-900/30 p-2 " href="mailto:harshpandey.tech@gmail.com" target="_blank">
                    <MdEmail />
                    harshpandey.tech@gmail.com
                  </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
