import React from 'react'
import { SearchFilter } from './components/SearchFilter'
import WordFadeIn from "@/components/ui/word-fade-in";
import LinearGradient from '@/components/ui/linear-gradient';
// import FilterTab from './components/FilterTab2';
import PostsTab from './components/PostsTab';
import {FilterTab} from './components/FilterTab';


const page = () => {
  return (
    <div className='min-h-screen text-black dark:bg-background bg-background dark:text-white  '>
      
      <div className='grid grid-cols-4 gap-2 w-full mt-10  '>
        <FilterTab />
        <div className='col-span-3'>
        <PostsTab />
        </div>
      </div>
      <div className='h-screen' ></div>
      
    </div>
  )
}

export default page
