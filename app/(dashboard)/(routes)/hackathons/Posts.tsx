import React from 'react'
import unstop from '@/app/assets/unstop.png'
import devpost from '@/app/assets/devpost.svg'
import devfolio from '@/app/assets/Devfolio.svg'
import { LuExternalLink } from "react-icons/lu";
import Image from 'next/image'
import { motion } from 'framer-motion';

interface PostsProps{
    title: string,
    url: string,
    logo: string,
    platform: string,
}

const Posts:React.FC<PostsProps> = ({title, url, logo, platform}) => {
    const URL = (platform==='unstop' && `https://unstop.com/${url}`) || (platform==='devpost' && `${url}`) || (platform==='devfolio' && `https://${url}`) || '';
    const Logo = (platform==='unstop' || platform==='devpost') ? (logo.startsWith('http') ? logo : 'https:' + logo) : logo;    

  return (
    <motion.a 
      href={URL} 
      target='_blank' 
      className='group min-w-[20vw] min-h-[20vh] px-5 py-4 flex flex-col justify-between items-start flex-wrap rounded-lg border border-gray-500 dark:border-gray-800 dark:backdrop-blur-xl transition-all ease-in-out duration-500 hover:border-accent hover:shadow-xl hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-700'
      whileHover={{ scale: 1.1, boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className='flex items-center space-x-3'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className='relative w-10 h-10'>
          <Image src={Logo} alt={platform} layout='fill' objectFit='contain' className='rounded-full' />
        </div>
        <h3 className='text-lg font-semibold'>{title}</h3>
      </motion.div>
      <motion.div
        className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <LuExternalLink size={20} />
      </motion.div>
    </motion.a>
  )
}

export default Posts;
