"use client"
import React, { useEffect, useState, useCallback } from 'react'
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
import { FaStar } from 'react-icons/fa'
import { useFavorites } from '@/app/hooks/use-favorites'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Page = () => {
  const [loading, setLoading] = useState(false);
  const [unstopPost, setUnstopPost] = useState<UnstopPost[]>([]);
  const [devposts, setDevposts] = useState([]);
  const [devfolio, setDevfolio] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("Unstop")
  const { favorites: externalFavorites, loadExternalFavorites, loading: favoritesLoading } = useFavorites();
  const { data: session, status } = useSession();
  const router = useRouter();

  const platforms = [
    { name: "Unstop", logo: unstop },
    { name: "Devpost", logo: devpost },
    { name: "Devfolio", logo: devfolioImg },
  ]

  // Separate useEffect for hackathon data fetching (runs only once)
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
  }, []); // No dependencies - runs only once on mount

  // Memoize the load favorites function to satisfy linter dependencies
  const memoizedLoadFavorites = useCallback(() => {
    if (session?.user?.id) {
      loadExternalFavorites();
    }
  }, [session?.user?.id, loadExternalFavorites]);

  // Separate useEffect for favorites loading (depends only on session)
  useEffect(() => {
    memoizedLoadFavorites();
  }, [memoizedLoadFavorites]);

  // Load favorites only when switching to favorites tab
  useEffect(() => {
    if (selectedPlatform === "Favorites") {
      memoizedLoadFavorites();
    }
  }, [selectedPlatform, memoizedLoadFavorites]);

  // Function to refresh favorites when a hackathon is unfavorited
  const refreshFavorites = useCallback(() => {
    if (selectedPlatform === "Favorites") {
      loadExternalFavorites();
    }
  }, [selectedPlatform, loadExternalFavorites]);

  // Function to handle platform selection with auth check
  const handlePlatformChange = (platformName: string) => {
    if (platformName === "Favorites") {
      if (status === "loading") return; // Wait for session to load
      if (!session) {
        router.push("/login");
        return;
      }
    }
    setSelectedPlatform(platformName);
  };

  // Function to handle favorites button click
  const handleFavoritesClick = () => {
    handlePlatformChange("Favorites");
  };



  return (
    <div className='min-h-screen w-full text-black dark:bg-background bg-background dark:text-white mb-20 relative'>
      {/* Top Right Favorites Button */}
      <motion.button
        onClick={handleFavoritesClick}
        className={`fixed top-20 right-3 md:right-6 z-20 flex items-center transition-all duration-300 ${
          selectedPlatform === "Favorites" 
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg scale-105' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-600 dark:hover:text-yellow-400'
        } ${
          'p-2 md:px-4 md:py-2 md:space-x-2 rounded-full'
        }`}
        whileHover={{ scale: selectedPlatform === "Favorites" ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        title="Favorites"
      >
        <FaStar className={`w-4 h-4 ${
          selectedPlatform === "Favorites" ? 'text-black' : 'text-yellow-500'
        }`} />
        <span className="text-sm font-medium hidden md:inline">Favorites</span>
      </motion.button>

      <div className='w-full mt-16 flex flex-col justify-start items-start gap-5'>

        <div className=" w-full flex justify-center items-center md:justify-start ">
          <div className="flex justify-center items-center md:items-start space-x-4 mx-auto w-full ">
            {platforms.map((platform) => (
              <motion.button
                key={platform.name}
                onClick={() => handlePlatformChange(platform.name)}
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
                id={entry.id.toString()}
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
                  id={entry.id.toString()}
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
                  id={entry._source.name}
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
        {
          selectedPlatform==="Favorites" &&
          <div className='w-full min-h-[50vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-10 '>
            {externalFavorites.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <FaStar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-500">No favorite hackathons yet</p>
                <p className="text-sm text-gray-400">Start favoriting hackathons by clicking the star icon!</p>
              </div>
            ) : (
              externalFavorites.map((entry: any) => (
                <Posts 
                  key={`${entry.platform}-${entry.externalId}`}
                  id={entry.externalId}
                  title={entry.title} 
                  url={entry.url} 
                  logo={entry.logo} 
                  platform={entry.platform}
                  mode={entry.mode}
                  location={entry.location}
                  status={entry.status}
                  onFavoriteChange={refreshFavorites}
                />
              ))
            )}
          </div>
        }
      </div>

    </div>
  )
}

export default Page
