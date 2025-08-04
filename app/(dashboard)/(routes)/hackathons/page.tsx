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

        const [unstopRes, devpostRes, devfolioRes] = await Promise.all([
          axios.get("/api/unstopHackathon"),
          axios.get("/api/devpostHackathon"),
          axios.get("/api/devfolioHackathon")
        ]);


        const unstopHackathons = unstopRes.data.hackathon.map((entry: any) => ({
          ...entry,
          mode: entry.event_type === 'VIRTUAL' ? 'Online' : entry.event_type === 'OFFLINE' ? 'Offline' : 'Hybrid'
        }));

        const devpostHackathons = devpostRes.data.hackathon.hackathons.map((entry: any) => ({
          ...entry,
          mode: entry.displayed_location.location?.includes('Online') ? 'Online' : 'Offline'
        }));

        const devfolioHackathons = devfolioRes.data.hackathon.hits.hits.map((entry: any) => ({
          ...entry,
          _source: {
            ...entry._source,
            mode: entry._source.apply_mode === 'both' ? 'Hybrid' : 
                  entry._source.is_online ? 'Online' : 'Offline',
            location: entry._source.location || entry._source.city || null
          }
        }));

        setDevposts(devpostHackathons);
        setUnstopPost(unstopHackathons);
        setDevfolio(devfolioHackathons);
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
              <Posts 
                key={entry.id} 
                title={entry.title} 
                url={entry.public_url} 
                logo={entry.logoUrl2} 
                platform='unstop'
                mode={entry.region === "offline" ? "Offline" : entry.region === "online" ? "Online" : "Hybrid"}
                location={entry.organisation.name}
                status={entry.status}
              />
            ))}
          </div>
          } 

        {
          selectedPlatform==="Devpost" &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              devposts.map((entry:any)=>(
                <Posts 
                  key={entry.id} 
                  title={entry.title} 
                  url={entry.url} 
                  logo={entry.thumbnail_url} 
                  platform='devpost'
                  mode={entry.mode}
                  location={entry.displayed_location.location?.includes('Online') ? null : entry.displayed_location.location}
                  status={entry.open_state === 'open' ? 'LIVE' : entry.open_state}
                />
              ))
            }
          </div>
        }
        {
          selectedPlatform==="Devfolio" &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap px-10 '>
            {
              devfolio.map((entry:any)=>(
                <Posts 
                  key={entry._source.name} 
                  title={entry._source.name} 
                  url={`${entry._source.slug}.devfolio.co`} 
                  logo={entry._source.hackathon_setting.logo} 
                  platform='devfolio'
                  mode={entry._source.is_online ? 'Online' : 'Offline'}
                  location={entry._source.location}
                  status={entry._source.status === 'publish' ? 'LIVE' : entry._source.status}
                />
              ))
            }
          </div>
        }
      </div>

    </div>
  )
}

export default Page
