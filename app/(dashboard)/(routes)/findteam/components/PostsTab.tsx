"use client"
import React, { useEffect, useState } from 'react'
import mockData from "./mock-data.json"
import PostCard from './PostCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'


interface HackathonEntry {
  hackathonName: string;
  skills: string[];
  role: string;
  experience: string;
  location: string;
  regDate: string;
  teamName: string;
  memberCount: string;
  hackathonMode: string;
  id: Number;
  createdAt: string;
}



const PostsTab = () => {
  const { search, mode, experience, skills } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const [data,setData]=useState([]);
  const [posts, setPosts] = useState<HackathonEntry[]>([]);

  useEffect(()=>{
   const fetch=async()=>{
      const res=await axios.get('/api/teams');
      console.log(res.data.Hackathon);
      setData(res.data.Hackathon);
      setPosts(res.data.Hackathon);
   }
   fetch();
  },[])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.teamName.toLowerCase().includes(search.toLowerCase());
    const matchesMode = mode.length ? mode.every(m => post.hackathonMode.includes(m)) : true;
    const matchesRole = experience.length ? experience.every(e => post.experience.includes(e)) : true;
    const matchesSkills = skills.length ? skills.every(skill => post.skills.includes(skill)) : true;

    return matchesSearch && matchesMode && matchesRole && matchesSkills;
  });

  return (
    <div className='w-full min-h-[50vh] grid grid-cols-1 lg:grid-cols-3 gap-4 flex-wrap '>
      
      {
         filteredPosts.map((entry, index)=>(
            <PostCard entry={entry} key={index} />
        ))
      }
    </div>
  )
}

export default PostsTab
