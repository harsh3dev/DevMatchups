import React from 'react'
import unstop from '@/app/assets/unstop.png'
import devpost from '@/app/assets/devpost.svg'
import { LuExternalLink } from "react-icons/lu";
import Image from 'next/image'

interface PostsProps{
    title: string,
    url: string,
    logo: string,
    platform: string,
}

const Posts:React.FC<PostsProps> = ({title, url, logo, platform}) => {
    const URL = platform==='unstop' ? `https://unstop.com/${url}` : url;
    
  return (
    <a href={URL} target='_blank' className=' group min-w-[20vw] min-h-[20vh] px-5 py-4 flex flex-col justify-between items-start flex-wrap rounded-lg border border-gray-500 dark:border-gray-800 dark:backdrop-blur-xl transition-all ease-linear hover:border-accent hover:dark:border-accent dark:bg-gray-900/60 hover:dark:bg-blue-900/30 bg-sky-100/70 hover:bg-sky-300/40  '>
        <div className='flex justify-between p-2 items-center w-full flex-wrap ' >
            <h1 className='text-xl font-bold '>
                {title}
            </h1>
            <img src={logo} width={100} height={100} alt='logo-image' />
        </div>
        <div className=' group flex justify-between p-2 items-center w-full ' >
            {
                platform==='unstop' ? <Image src={unstop}  width={50} height={50} alt='logo-image' /> : <Image src={devpost} width={50} height={50} alt='logo-image' />
            }

            <span className=' group-hover:scale-[100%] hover:scale-[500%] '><LuExternalLink className=' group-hover:scale-[100%] hover:scale-[500%] ' /></span>
            
        </div>
    </a>
  )
}

export default Posts
