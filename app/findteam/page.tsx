import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { SearchFilter } from './components/SearchFilter'
import WordFadeIn from "@/components/ui/word-fade-in";
import LinearGradient from '@/components/ui/linear-gradient';
import FilterTab from './components/FilterTab';
import PostsTab from './components/PostsTab';


const page = () => {
  return (
    <div className=' min-h-screen text-black dark:bg-background bg-background dark:text-white relative '>
      <Navbar />
      <div className='w-full relative h-[150px] text-white flex items-center justify-center text-center text-7xl font-extrabold mb-5 '>
        <WordFadeIn words="Participate in hackathons with other teams!" className='text-xl z-10 md:text-4xl text-white tracking-wide ' />
        <LinearGradient from='#7C3AED' to='#312E81' direction='right' />
      </div>
      <div className='max-w-4xl w-full mx-auto'>
        <SearchFilter />
      </div>
      {/* <div className='grid grid-cols-3 h-full gap-2 max-w-[1260px] mx-auto mt-5 '>
        <FilterTab />
        <div className='col-span-2'>
        <PostsTab />
        </div>
      </div> */}
      <div className='h-screen' ></div>
      <Footer />
    </div>
  )
}

export default page
