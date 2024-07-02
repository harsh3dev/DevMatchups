import React from 'react'
import mockData from "./mock-data.json"
import PostCard from './PostCard'

const PostsTab = () => {
  return (
    <div className='w-full min-h-[50vh] grid grid-cols-3 gap-4  '>
      
      {
        mockData.map((entry, index)=>(
            <PostCard entry={entry} key={index} />
        ))
      }
    </div>
  )
}

export default PostsTab
