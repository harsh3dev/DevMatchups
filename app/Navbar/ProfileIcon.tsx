
import { RiAccountBoxFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react"

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

export function ProfileIcon() {

    const {data : session} = useSession();

    const img = session?.user?.image ? session?.user?.image : `https://robohash.org/${session?.user?.name}`;

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

                <DropdownMenuItem className=" w-full flex justify-between items-center cursor-pointer ">
                    <span> GitHub </span> 
                    <span> <IoLogoGithub /> </span> 
                </DropdownMenuItem>
                <DropdownMenuItem className=" w-full flex justify-between items-center cursor-pointer ">
                    <span> Support </span> 
                    <span> <MdEmail /> </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className=" w-full flex justify-between items-center cursor-pointer ">
                    <span> Log out </span>
                    <span> <IoMdLogOut /> </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
