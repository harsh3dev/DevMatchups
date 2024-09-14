import React from 'react'
import unstop from '@/app/assets/unstop.png'
import devpost from '@/app/assets/devpost.svg'
import devfolio from '@/app/assets/Devfolio.svg'
import { LuExternalLink } from "react-icons/lu";
import Image from 'next/image'

interface PostsProps{
    title: string,
    url: string,
    logo: string,
    platform: string,
}

const Posts:React.FC<PostsProps> = ({title, url, logo, platform}) => {
    const URL = (platform==='unstop' && `https://unstop.com/${url}`) || (platform==='devpost' && `https://${url}`) || (platform==='devfolio' && `https://${url}`) || '';
    const Logo = (platform==='unstop' || platform==='devpost') ? (logo.startsWith('http') ? logo : 'https:' + logo) : logo;    

  return (
    <a href={URL} target='_blank' className=' group min-w-[20vw] min-h-[20vh] px-5 py-4 flex flex-col justify-between items-start flex-wrap rounded-lg border border-gray-500 dark:border-gray-800 dark:backdrop-blur-xl transition-all ease-linear hover:border-accent hover:dark:border-accent dark:bg-gray-900/60 hover:dark:bg-blue-900/30 bg-sky-100/70 hover:bg-sky-300/40  '>
        <div className='flex justify-between p-2 items-center w-full ' >
            <h1 className='text-xl font-bold text-wrap '>
                {title}
            </h1>
            <Image src={Logo} width={100} height={100} alt='logo-image' className=' ' />
        </div>
        <div className=' group flex justify-between p-2 items-center w-full ' >
            {
                platform==='unstop' && <Image src={unstop}  width={50} height={50} alt='logo-image' /> }
                { platform==='devpost' && <Image src={devpost} width={50} height={50} alt='logo-image' /> }
                { platform==='devfolio' && <Image src={devfolio} width={50} height={75} alt='logo-image' /> }

            <span className=' group-hover:scale-[100%] hover:scale-[500%] '><LuExternalLink className=' group-hover:scale-[100%] hover:scale-[500%] ' /></span>
            
        </div>
    </a>
  )
}

export default Posts
