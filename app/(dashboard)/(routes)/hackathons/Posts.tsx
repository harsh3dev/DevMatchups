import React from 'react'
import unstop from '@/app/assets/unstop.png'
import devpost from '@/app/assets/devpost.svg'
import devfolio from '@/app/assets/Devfolio.svg'
import { LuExternalLink } from "react-icons/lu";
import Image from 'next/image'
import { motion } from 'framer-motion';

interface PostsProps {
    title: string,
    url: string,
    logo: string,
    platform: string,
    mode?: string,
    location?: string,
    status?: string,
}

const Posts:React.FC<PostsProps> = ({title, url, logo, platform, mode, location, status}) => {
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
          <Image src={Logo !== null ? Logo : 
            platform==='unstop' ? unstop : 
            platform==='devpost' ? devpost : 
            platform==='devfolio' ? devfolio : 
            ''
          } alt={platform} layout='fill' objectFit='contain' className='rounded-full' />
        </div>
        <h3 className='text-lg font-semibold'>{title}</h3>
      </motion.div>
      {(mode || location) && (
        <motion.div 
          className='flex flex-wrap gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {mode && (
            <span className='px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'>
              {mode}
            </span>
          )}
          {status && (
            <span className={`px-2 py-1 rounded-full ${
              status.toLowerCase() === 'live' || status.toLowerCase() === 'open' 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {status}
            </span>
          )}
          {location && mode !== 'Online' && (
                          <span className='flex items-center gap-1 w-full mt-1'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {location}
            </span>
          )}
        </motion.div>
      )}
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
