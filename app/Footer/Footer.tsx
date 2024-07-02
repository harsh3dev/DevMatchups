"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FiGithub } from "react-icons/fi";
import { SiGithubsponsors } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import GitHubButton from 'react-github-btn'

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-10 md:py-10 lg:py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center gap-8 ">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Subscribe to our newsletter</h3>
          <p className="text-gray-200">Get the latest updates and offers delivered directly to your inbox.</p>
          <form className="flex space-x-2 justify-center items-center ">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 rounded-lg "
            />
            <Button
              type="submit"
              className="bg-white text-blue-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 rounded-lg "
            >
              Subscribe
            </Button>
          </form>
          <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-8 flex justify-between items-center text-gray-300">
        <p>&copy; 2024 DevMatchups. All rights reserved.</p>
      </div>
        </div>
        <div className="flex justify-between items-center gap-20 " >
        <div className="space-y-4  ">
          <h3 className="text-2xl font-bold">Contribute</h3>
          <ul className="space-y-2 text-gray-200">
            {/* <li>
              <Link href="https://github.com/harsh3dev/devmatchups" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4  w-[150px] h-5 bg-gray-900/60 rounded-lg transition-colors ease-in-out border border-slate-400 hover:bg-gray-800">
                <FiGithub />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                Github
                </div>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/harsh3dev/devmatchups" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4  w-[150px] h-5 bg-pink-700/60 rounded-lg border transition-colors ease-in-out border-slate-400 hover:bg-pink-600">
                <SiGithubsponsors color="pink" />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                Sponsor
                </div>
              </Link>
            </li> */}

            <li>
              <GitHubButton href="https://github.com/harsh3dev/DevMatchups/fork" data-color-scheme="no-preference: light; light: light; dark: light;" data-size="large" data-show-count="true" aria-label="Fork harsh3dev/DevMatchups on GitHub">Fork</GitHubButton>
            </li>
            <li>
              <GitHubButton href="https://github.com/harsh3dev/DevMatchups" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star harsh3dev/DevMatchups on GitHub">Star</GitHubButton>
            </li>
            <li>
              <GitHubButton href="https://github.com/sponsors/harsh3dev" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-heart" data-size="large" aria-label="Sponsor @harsh3dev on GitHub">Sponsor</GitHubButton>

            </li>
            {/* <li>
              <Link href="https://github.com/harsh3dev/devmatchups" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4  w-[150px] h-5 bg-blue-900/60 rounded-lg border transition-colors ease-in-out border-slate-400 hover:bg-blue-600">
                <FaLinkedinIn />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                Linkedin
                </div>
              </Link>
            </li> */}
            
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Contact</h3>
          <ul className="space-y-2 text-gray-200">

            <li>
              <Button variant="ghost" className="dark:hover:bg-blue-950"  >
                <Link className="flex justify-center items-center gap-2" href="mailto:yaahg342@gmail.com" target="_blank">
                <MdEmail />
                yaahg342@gmail.com
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="dark:hover:bg-blue-950"  >
                <Link className="flex justify-center items-center gap-2" href="mailto:harshpandey.tech@gmail.com" target="_blank">
                <MdEmail />
                harshpandey.tech@gmail.com
                </Link>
              </Button>
            </li>
            <li>
            <div className="flex items-center space-x-2"> 

              <Button variant="ghost" className="dark:hover:bg-blue-950"  >
                <Link className="flex justify-center items-center gap-2" href="https://www.linkedin.com/in/yash-gupta-64956b246/" target="_blank">
                <FaLinkedinIn />
                Yash Gupta
                </Link>
              </Button>

              <Button variant="ghost" className="dark:hover:bg-blue-950">
                <Link className="flex justify-center items-center gap-2" href="https://www.linkedin.com/in/harsh3dev/" target="_blank">
                <FaLinkedinIn />
                Harsh Pandey
                </Link>
              </Button>
            </div>
            </li>
            
            
            {/* <li>
              <div className="flex items-center space-x-2 w-full ">
              <Link href="mailto:yaahg342@gmail.com" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4 px-2 h-5 rounded-lg border transition-colors ease-in-out border-slate-400 hover:bg-sky-600">
                <MdEmail />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                yaahg342@gmail.com
                </div>
              </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-2 w-full ">
              <Link href="mailto:harshpandey.tech@gmail.com" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4 px-2 h-5  rounded-lg border transition-colors ease-in-out border-slate-400 hover:bg-sky-600">
                <MdEmail />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                harshpandey.tech@gmail.com
                </div>
              </Link>
                
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex items-center space-x-2">
              <Link href="https://www.linkedin.com/in/harsh3dev/" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4  w-[150px] h-5 bg-blue-900 rounded-lg border transition-colors ease-in-out border-slate-400 hover:bg-blue-600">
                <FaLinkedinIn />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                Harsh Pandey
                </div>
              </Link>
              </div>
              <div className="flex items-center space-x-2">
              <Link href="https://www.linkedin.com/in/yash-gupta-64956b246/" target="_blank" className="hover:text-white text-white" prefetch={false}>
                <div className=" flex items-center justify-center py-4  w-[150px] h-5 bg-blue-900 rounded-lg border transition-colors ease-in-out border-slate-400 hover:bg-blue-600">
                <FaLinkedinIn />
                <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                Yash Gupta
                </div>
              </Link>
              </div>
            </li> */}
          </ul>
        </div>
        </div>
      </div>
      
    </footer>
  )
}
