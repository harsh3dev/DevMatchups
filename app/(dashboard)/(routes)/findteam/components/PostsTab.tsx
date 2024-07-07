"use client"
import React, { useEffect, useState } from 'react'
import mockData from "./mock-data.json"
import PostCard from './PostCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store/store'
import { setPosts } from '@/lib/store/features/postSlice/postSlice'

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
  const { search, modeOptions, expOptions, skillOptions } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();
  // const [data,setData]=useState([]);
  // const [posts, setPostss] = useState<HackathonEntry[]>([]);
  const posts = useSelector((state: RootState) => state.post.posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/teams');
            console.log(res.data.Hackathon);
            dispatch(setPosts(res.data.Hackathon));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    fetch();
}, [dispatch]);

useEffect(() => {
    console.log("POSTSS", posts);
}, [posts]);

  const matchSearch = (val:string) =>{
    return val.toLowerCase().includes(search.toLowerCase())
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = matchSearch(post.teamName) || matchSearch(post.hackathonName) || matchSearch(post.location) || matchSearch(post.experience) || matchSearch(post.hackathonMode) || matchSearch(post.role) || post.skills.some(s => matchSearch(s));
    const matchesMode = modeOptions.length ? modeOptions.some(m => post.hackathonMode.toLowerCase().includes(m.toLowerCase())) : true;
    const matchesRole = expOptions.length ? expOptions.some(e => post.experience.toLowerCase().includes(e.toLowerCase())) : true;
    const matchesSkills = skillOptions.length ? skillOptions.some(skill => post.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) : true;

    return matchesSearch && (matchesMode && matchesRole && matchesSkills);
  });

  return (
    <div className='w-full min-h-[50vh] grid grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap '>

      {loading && <h1 className='text-xl text-text dark:text-text font-extrabold '>Loading...</h1>}

      {
         filteredPosts.map((entry, index)=>(
            <PostCard entry={entry} key={index} />
        ))
      }
    </div>
  )
}

export default PostsTab
