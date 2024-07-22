import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    } from "@/components/ui/avatar"
    import { FaCircleUser } from "react-icons/fa6";
import { useSession } from 'next-auth/react';

const UserAvatar = () => {
    const {data : session} = useSession();

    const img = session?.user?.image ? session?.user?.image : `https://robohash.org/${session?.user?.name}`;
    return (
        <Avatar className="cursor-pointer border border-accent ">
            <AvatarImage src={img} alt="avatar-image" />
            <AvatarFallback><FaCircleUser /></AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar
