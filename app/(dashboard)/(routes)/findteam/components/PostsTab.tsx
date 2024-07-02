"use client"
import React, { useEffect, useState } from 'react'
import mockData from "./mock-data.json"
import PostCard from './PostCard'
import axios from 'axios'

const PostsTab = () => {

  const [data,setData]=useState([]);

  useEffect(()=>{
   const fetch=async()=>{
      const res=await axios.get('/api/teams');
      console.log(res.data.Hackathon);
      setData(res.data.Hackathon);
   }
   fetch();
  },[])

  return (
    <div className='w-full min-h-[50vh] grid grid-cols-3 gap-4  '>
      
      {
         data.map((entry, index)=>(
          <>
            <PostCard entry={entry} key={index} />
        ))
      }
    </div>
  )
}

export default PostsTab
