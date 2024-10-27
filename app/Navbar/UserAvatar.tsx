import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    } from "@/components/ui/avatar"
    import { FaCircleUser } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import { generateGravatarUrl } from '@/utils/getGravatarUrl';

const UserAvatar = () => {
    const {data : session} = useSession();

    const img = session?.user?.image ? session?.user?.image : generateGravatarUrl(session?.user?.email as string);
    return (
        <Avatar className="cursor-pointer border border-accent ">
            <AvatarImage src={img} alt="avatar-image" />
            <AvatarFallback><FaCircleUser /></AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar
