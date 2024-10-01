"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import unstop from '@/app/assets/unstop.png'
import devfolioImg from '@/app/assets/Devfolio.svg'
import devpost from '@/app/assets/devpost.svg'
import axios from 'axios'
import { devpostData } from './mock_data'
import Posts from './Posts'
import { UnstopPost } from './types'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'


const Page = () => {
  const [loading, setLoading] = useState(false);
  const [unstopPost, setUnstopPost] = useState<UnstopPost[]>([]);
  const [devposts, setDevposts] = useState([]);
  const [devfolio, setDevfolio] = useState([]);

  const [selectedPlatform, setSelectedPlatform] = useState("Unstop")


  const platforms = [
    { name: "Unstop", logo: unstop },
    { name: "Devpost", logo: devpost },
    { name: "Devfolio", logo: devfolioImg },
  ]



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const [res1, res2, res3] = await Promise.all([
          axios.get("/api/unstopHackathon"),
          axios.get("/api/devpostHackathon"),
          axios.get("/api/devfolioHackathon")
        ]);
        // const res1 = await  axios.get("/api/unstopHackathon");
        // const res2 = await axios.get("/api/devpostHackathon");
        // const res3 = await axios.get("/api/devfolioHackathon");
        // console.log("devpost", res2.data.hackathon.hackathons);
        console.log("devfolio", res3.data.hackathon.hits.hits);
        console.log("devfolio logo", res3.data.hackathon.hits.hits[0]._source.hackathon_setting.logo);
        // console.log("devpost URL", res2.data.hackathon.hackathons[0].thumbnail_url);
        setDevposts(res2?.data?.hackathon?.hackathons);
        // console.log(res1?.data?.hackathon?.data?.data);
        setUnstopPost(res1?.data?.hackathon?.data?.data);
        setDevfolio(res3?.data?.hackathon?.hits.hits);
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

        <div className=" w-full flex justify-center items-center md:justify-start ">
          <div className="flex justify-center items-center md:items-start space-x-4 mx-auto w-full ">
            {platforms.map((platform) => (
              <motion.button
                key={platform.name}
                onClick={() => setSelectedPlatform(platform.name)}
                className={cn("flex items-center  space-x-2 px-6 py-3 rounded-lg transition-all duration-300 bg-white", 
                  selectedPlatform === platform.name
                    ? ' outline outline-offset-4 outline-primary dark:outline-offset-4 dark:outline-primary'
                    : ''
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  className=" w-auto h-[15px] md:h-[25px] "
                />
              </motion.button>
            ))}
          </div>
        </div>



        <hr className='w-full text-text dark:text-text h-4 mt-5 opacity-50 ' />

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
          selectedPlatform==="Unstop" &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {unstopPost && unstopPost.map && unstopPost.map((entry) => (
              <Posts key={entry.id} title={entry.title} url={entry.public_url} logo={entry.logoUrl2} platform='unstop' />
            ))}
          </div>
          } 

        {
          selectedPlatform==="Devpost" &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              devposts.map((entry:any)=>(
                <Posts key={entry.id} title={entry.title} url={entry.url} logo={entry.thumbnail_url} platform='devpost' />
              ))
            }
          </div>
        }
        {
          selectedPlatform==="Devfolio" &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              devfolio.map((entry:any)=>(
                <Posts key={entry._source.name} title={entry._source.name} url={`${entry._source.slug}.devfolio.co`} logo={entry._source.hackathon_setting.logo} platform='devfolio' />
              ))
            }
          </div>
        }
      </div>

    </div>
  )
}

export default Page
