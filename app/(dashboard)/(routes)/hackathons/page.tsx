"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import unstop from '@/app/assets/unstop.png'
import devpost from '@/app/assets/devpost.svg'
import axios from 'axios'
import { devpostData } from './mock_data'
import Posts from './Posts'
import { UnstopPost } from './types'
import Loading from '../teams/components/Loading'
import { Skeleton } from '@/components/ui/skeleton'


const Page = () => {
  const [unstopClicked, setUnstopClicked] = useState(true);
  const [devpostClicked, setdevpostClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unstopPost, setUnstopPost] = useState<UnstopPost[]>([]);
  const [devposts, setDevposts] = useState([]);


  function handleClick() {
    setUnstopClicked((prev)=>(!prev))
    setdevpostClicked((prev)=>(!prev))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res1 = await  axios.get("/api/unstopHackathon");
        const res2 = await axios.get("/api/devpostHackathon");
        console.log(res2.data.hackathon.hackathons);
        setDevposts(res2?.data?.hackathon?.hackathons);
        console.log(res1?.data?.hackathon?.data?.data);
        setUnstopPost(res1?.data?.hackathon?.data?.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <div className='min-h-screen w-full text-black dark:bg-background bg-background dark:text-white mb-20 '>
      <div className='w-full mt-16 flex flex-col justify-start items-start gap-5'>
        <div className='w-full flex justify-start items-center gap-5 rounded-lg px-10' >
          <div onClick={handleClick} className="p-2 flex items-center justify-center gap-4 rounded-md border w-[200px] h-[70px] border-text border-dashed dark:border-text dark:hover:bg-gray-200/80 cursor-pointer transition-colors ease-linear " 
          style={{backgroundColor: unstopClicked ? "var(--clickWhite)" : ""}}
          >
            <Image src={unstop} height={50} width={70} alt='unstop_icon' />
          </div>
          <div onClick={handleClick} className="p-2 flex items-center justify-center gap-4 rounded-md border w-[200px] h-[70px] border-text border-dashed dark:border-text dark:hover:bg-gray-200/80 cursor-pointer transition-colors ease-linear " 
          style={{backgroundColor: devpostClicked ? "var(--clickWhite)" : ""}}
          >
            <Image src={devpost} height={50} width={100} alt='devpost_icon' />
          </div>
        </div>
        {/* <hr className='w-full text-text dark:text-text h-4' /> */}

        {
          loading && <div className='w-full grid grid-cols-2 lg:grid-cols-3 gap-2 flex-wrap px-10 '>
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
          </div>
        }
        {
          unstopClicked &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {unstopPost && unstopPost.map && unstopPost.map((entry) => (
              <Posts key={entry.id} title={entry.title} url={entry.public_url} logo={entry.logoUrl2} platform='unstop' />
            ))}
          </div>
          } 

        {
          devpostClicked && 
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              devposts.map((entry:any)=>(
                <Posts key={entry.id} title={entry.title} url={entry.url} logo={entry.thumbnail_url} platform='devpost' />
              ))
            }
          </div>
        }
      </div>

    </div>
  )
}

export default Page
