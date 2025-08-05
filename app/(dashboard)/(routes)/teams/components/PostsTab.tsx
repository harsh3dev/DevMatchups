"use client"
import React, { useEffect, useState } from 'react'
import mockData from "./mock-data.json"
import PostCard from './PostCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store/store'
import { setPosts } from '@/lib/store/features/postSlice/postSlice'
import Loading from './Loading'

interface HackathonEntry {
  hackathonName: string;
  skills: string[];
  role: string;
  experience: string;
  location: string;
  regDate: string;
  teamName: string;
  memberCount: string;
  regURL: string;
  hackathonMode: string;
  id: Number;
  createdAt: string;
  description: string;
}

const PostsTab = () => {
  const { search, modeOptions, expOptions, skillOptions } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();
  const [data,setData]=useState([]);
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

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch = matchSearch(post.teamName) || matchSearch(post.hackathonName) || matchSearch(post.location) || matchSearch(post.experience) || matchSearch(post.hackathonMode) || matchSearch(post.role) || post.skills.some(s => matchSearch(s));
    const matchesMode = modeOptions.length ? modeOptions.some(m => post.hackathonMode.toLowerCase().includes(m.toLowerCase())) : true;
    const matchesRole = expOptions.length ? expOptions.some(e => post.experience.toLowerCase().includes(e.toLowerCase())) : true;
    const matchesSkills = skillOptions.length ? skillOptions.some(skill => post.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) : true;

    return matchesSearch && (matchesMode && matchesRole && matchesSkills);
  });

  return (
    <div className='w-full min-h-[50vh] grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 flex-wrap '>

      {loading ? (
        <Loading />
      ) : filteredPosts && filteredPosts.length > 0 ? (
        <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
          {filteredPosts.map((entry, index) => (
            <PostCard entry={entry} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500 max-w-lg mx-auto mt-10 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Hmm, that&#39;s a rare combo!</h3>
          <p>
            We couldn&#39;t find any hackathons that match all of your selected filters. 
            Don&#39;t worry! Your next great project is likely just a click away. Try broadening your search.
          </p>
        </div>
      )}

      
    </div>
  )
}

export default PostsTab
