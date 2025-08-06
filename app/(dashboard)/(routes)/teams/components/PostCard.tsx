
import React from 'react'
import Capsule from './Capsule';
import { Button } from '@/components/ui/button';

import { IoLocationSharp } from "react-icons/io5";
import { MdBugReport } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from 'next/link';
import { useFavorites } from "@/app/hooks/use-favorites";
import { useEffect } from "react";

import { HackathonEntry } from '@/app/(dashboard)/(routes)/findmember/Form/types';

interface PostCardProps {
  entry: HackathonEntry;
  className?: string,
}


const PostCard: React.FC<PostCardProps> = ({ entry, className }) => {
  const { toggleExternalFavorite, isExternalFavorited } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const hackathon = {
      id: entry.id.toString(),
      title: entry.hackathonName,
      url: entry.regURL,
      logo: '',
      platform: 'local',
      mode: entry.hackathonMode,
      location: entry.location,
      status: '',
    };
    toggleExternalFavorite(hackathon);
  };

  function timeDifference(givenTime: string): string {
    const now = new Date();
    const givenDate = new Date(givenTime);

    const diffMs = now.getTime() - givenDate.getTime();

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  }

  return (
    <div className='min-w-[20vw] min-h-[20vh] px-5 py-4 flex flex-col justify-between items-start rounded-lg border border-gray-500 dark:border-gray-800 dark:backdrop-blur-xl transition-all ease-linear hover:border-accent hover:dark:border-accent dark:bg-gray-900/60 hover:dark:bg-blue-900/30 bg-sky-100/70 hover:bg-sky-300/40  '>      
      <div className='w-full flex flex-col justify-between items-start rounded-lg '>
        <div className=' w-full flex justify-between items-center'>
          <div className="flex items-center gap-2">
            <h1 className='font-bold text-2xl' >
              {entry.hackathonName}
            </h1>
            <button
              onClick={handleFavoriteClick}
              className="p-1 hover:scale-110 transition-transform"
            >
              {isExternalFavorited(entry.id.toString(), 'local') ? (
                <FaStar className="w-6 h-6 text-yellow-500" />
              ) : (
                <FaRegStar className="w-6 h-6" />
              )}
            </button>
          </div>
          <Capsule item={entry.hackathonMode} key={entry.hackathonMode} className='bg-green-700/80 dark:bg-green-300/50  text-white dark:text-black hover:bg-green-800/80 hover:dark:bg-green-600/80  ' />
        </div>

        <div className=' w-full flex justify-between items-center mt-4 '>
          <span className='text-xl'>
            {entry.teamName}
          </span>
          <span className=' text-sm text-secondary dark:text-primary '>

            Open: {entry.memberCount}
          </span>
        </div>

        <div className=' w-full flex justify-start items-center gap-2 mb-4 mt-1 flex-wrap '>
          <span className=' rounded-full text-sm flex justify-center items-center gap-1'>
          <MdBugReport />
            {entry.role}
          </span>
          <span className=' rounded-full text-sm flex justify-center items-center gap-1'>
          <FaBusinessTime />
            {entry.experience}
          </span>
          <span className=' rounded-full text-sm flex justify-center items-center gap-1'>
          <IoLocationSharp />
            {entry.location}
          </span>
        </div>

        <div className='w-full flex flex-wrap justify-start items-center gap-2'>
          {entry.skills.slice(0, 5).map((skill, index) => (
            <Capsule item={skill} key={index} className='border border-accent dark:border-accent text-black hover:text-white ' />
          ))}

          {entry.skills.length > 5 && <div className='flex justify-between items-center gap-1 '>
            <span className='text-xs text-slate-700 dark:text-slate-400 '>
              + {entry.skills.length - 5} more
            </span>
          </div>
          }
        </div>
      </div>
      <div className=' flex justify-between items-center text-base font-medium w-full mt-4 ' >
        <span className='text-sm text-gray-700 dark:text-gray-300 border-b border-dashed border-gray-700 dark:border-gray-300 '>
          {timeDifference(entry.createdAt)}
        </span>

        <Button className=' bg-primary dark:bg-primary hover:bg-secondary dark:hover:bg-secondary text-white dark:text-gray-950 dark:hover:text-white font-medium dark:font-bold transition-colors ease-in-out ' >
          <Link href={`/teams/${entry.id}`} >
            Apply Now
          </Link>
        </Button>
        {/* create a map of array of numbers from 1 to 10 and render div with key=index */}

      </div>
    </div>
  )
}

export default PostCard