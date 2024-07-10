"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import unstop from '@/app/assets/unstop.png'
import devpost from '@/app/assets/devpost.svg'
import axios from 'axios'
import {unstopData} from './mock_data'
import { devpostData } from './mock_data'
import Posts from './Posts'


const page = () => {
  const [unstopClicked, setUnstopClicked] = useState(true);
  const [devpostClicked, setdevpostClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unstopPost, setUnstopPost] = useState([]);
  const [devpostPost, setDevpostPost] = useState([]);

  const unstopURL = 'https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&oppstatus=recent'
  const devpostURL = 'https://devpost.com/api/hackathons?order_by=recently-added'

  function handleClick() {
    setUnstopClicked((prev)=>(!prev))
    setdevpostClicked((prev)=>(!prev))
  }

  // useEffect(()=>{
  //   const fetch = async () => {
  //     // setLoading(true);
  //     try {
  //       const res1 = await axios.get(unstopURL);
  //       const res2 = await axios.get(devpostURL);
  //       setTimeout(() => {
  //         console.log(res1.data);
  //         console.log(res2.data);
  //       }, 2000);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     } finally {
  //         // setLoading(false);
  //     }
  // };
  // fetch();
  // },[])


  return (
    <div className='min-h-screen w-full text-black dark:bg-background bg-background dark:text-white mb-20 '>
      {/* <Tabs defaultValue="unstop" className=" mt-10 w-full  ">
        <TabsList className='w-full'>
          <TabsTrigger value="unstop">unstop</TabsTrigger>
          <TabsTrigger value="devpost">devpost</TabsTrigger>
        </TabsList>
        <TabsContent value="unstop">Make changes to your unstop here.</TabsContent>
        <TabsContent value="devpost">Change your devpost here.</TabsContent>
      </Tabs> */}

      <div className='w-full mt-16 flex flex-col justify-start items-start gap-5'>
        <div className='w-full flex justify-start items-center gap-5 rounded-lg px-10' >
          <div onClick={handleClick} className="p-2 flex items-center justify-center gap-4 rounded-md border w-[200px] h-[70px] border-text border-dashed dark:border-text dark:hover:bg-gray-200/80 cursor-pointer  " 
          style={{backgroundColor: unstopClicked ? "var(--clickWhite)" : ""}}
          >
            <Image src={unstop} height={50} width={70} alt='unstop_icon' />
          </div>
          <div onClick={handleClick} className="p-2 flex items-center justify-center gap-4 rounded-md border w-[200px] h-[70px] border-text border-dashed dark:border-text dark:hover:bg-gray-200/80 cursor-pointer  " 
          style={{backgroundColor: devpostClicked ? "var(--clickWhite)" : ""}}
          >
            <Image src={devpost} height={50} width={100} alt='devpost_icon' />
          </div>
        </div>
        <hr className='w-full text-text dark:text-text h-4' />
        {
          unstopClicked &&
          <div className='w-full min-h-[50vh] grid grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              unstopData.data.data.map((entry)=>(
                <Posts key={entry.id} title={entry.title} url={entry.public_url} logo={entry.logoUrl2} platform='unstop' />
              ))
            }
          </div>
        }

        {
          devpostClicked && 
          <div className='w-full min-h-[50vh] grid grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              devpostData.hackathons.map((entry)=>(
                <Posts key={entry.id} title={entry.title} url={entry.url} logo={entry.thumbnail_url} platform='devpost' />
              ))
            }
          </div>
        }
      </div>

    </div>
  )
}

export default page
