import React from 'react'
import PostsTab from './components/PostsTab';
import {FilterTab} from './components/FilterTab';


const page = () => {
  return (
    <div className='min-h-screen text-black dark:bg-background bg-background dark:text-white  '>
      
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2 w-full mt-10 pr-5  '>
        <FilterTab />
        <div className='col-span-3 px-5 lg:px-0 pt-4'>
        <PostsTab />
        </div>
      </div>      
    </div>
  )
}

export default page
