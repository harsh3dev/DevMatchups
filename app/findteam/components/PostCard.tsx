
import React from 'react'
import Capsule from './Capsule';
import { Button } from '@/components/ui/button';

import { IoLocationSharp } from "react-icons/io5";
import { MdBugReport } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";


interface HackathonEntry {
  hackathonName: string;
  skills: string[];
  role: string;
  experience: string;
  location: string;
  regDate: string;
  teamName: string;
  hackathonMode: string;
  slug: string;
  createdAt: string;
}

interface PostCardProps {
  entry: HackathonEntry;
  className?: string,
}


const PostCard: React.FC<PostCardProps> = ({ entry, className }) => {
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
    
    <div className='min-w-[350px] min-h-[250px] px-5 py-4 flex flex-col justify-between items-start rounded-lg border border-accent dark:border-accent dark:backdrop-blur-xl transition-all ease-in-out  '>      
      <div className='w-full flex flex-col justify-between items-start rounded-lg '>
        <div className=' w-full flex justify-between items-center'>
          <h1 className='font-bold text-2xl ' >
            {entry.hackathonName}
          </h1>
          <Capsule item={entry.hackathonMode} key={entry.hackathonMode} className='bg-green-700/80 dark:bg-green-300/50  text-white dark:text-black hover:bg-green-800/80 dark:hover:bg-green-600/80  ' />
        </div>

        <div className=' w-full flex justify-between items-center mt-4 '>
          <span className='text-xl'>
            {entry.teamName}
          </span>
          <span className=' text-sm text-secondary '>

            Open: 2
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
            <Capsule item={skill} key={index} className='border border-accent dark:border-secondary text-black hover:text-white ' />
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

        <Button className=' bg-primary dark:bg-primary hover:bg-secondary dark:hover:bg-secondary text-white dark:text-gray-950 dark:hover:text-white font-medium dark:font-bold transition-colors ease-in-out ' >Apply Now</Button>
      </div>
    </div>
  )
}

export default PostCard











{/* contact info: email, linkedin, github ------ additional info
  reg link ------ additional info
  description ------ additional info
  memberCount ------ additional info

  1. Hackathon Name
  2. skills capsule
  3. role capsule
  4. experience
  5. location 
  6. last date of reg/last date to apply
  7. 1 day ago, mins ago etc
  8. team name
  9. mode capsule

{
    hackathonName: string,
    skills: string[],
    role: string,
    experience: string,
    location: string,
    regDate: Date,
    teamName: string,
    hackathonMode: string,
  }
*/}
