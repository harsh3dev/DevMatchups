'use client'
import React from 'react'
import { useSession } from "next-auth/react"

const UserImage = () => {
    
    const {data : session} = useSession();
    const img = session?.user?.image ? session?.user?.image : `https://robohash.org/${session?.user?.name}`;
    return (
        <div className=' w-[60px] h-[60px] md:w-[100px] md:h-[100px] grid place-items-center rounded-full bg-accent '>
            <img src={img} width={100} height={100} alt='profile_image' className='object-contain rounded-full ' />
        </div>
    )
}

export default UserImage
