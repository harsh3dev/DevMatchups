"use client"
import { RiAccountBoxFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import Link from "next/link";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaCircleUser } from "react-icons/fa6";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Info } from "lucide-react";
import { generateGravatarUrl } from "@/utils/getGravatarUrl";

export function ProfileIcon() {

    const {data : session} = useSession();

    const img = session?.user?.image 
        ? session.user.image 
        : generateGravatarUrl(session?.user?.email as string);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border border-accent ">
                    <AvatarImage src={img} alt="avatar-image" />
                    <AvatarFallback><FaCircleUser /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" >
                        <Link href={`/dashboard/profile`} className="w-full flex justify-between items-center">
                            <span> My Profile </span>
                            <span> <RiAccountBoxFill /> </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" >
                        <Link href={`/dashboard`} className="w-full flex justify-between items-center">
                            <span> Dashboard </span>
                            <span> <MdDashboard /> </span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" >
                        <Link href={`https://forms.gle/BsppX1H3HGbA6ioaA`} target="_blank" className="w-full flex justify-between items-center">
                            <span> Report a bug </span>
                            <span> <Info className="w-4 h-4" /> </span>
                        </Link>
                    </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className=" w-full flex justify-between items-center cursor-pointer ">
                    <span> Log out </span>
                    <span> <IoMdLogOut /> </span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
