import React from 'react'
import { MdModeEdit } from 'react-icons/md'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
import EditProfileForm from './EditProfileForm'


interface PropInterface{
    className?: string,
}

const EditProfile:React.FC<PropInterface> = ({className}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`w-fit px-4 py-2 cursor-pointer font-semibold rounded-lg bg-primary text-white dark:text-gray-200 flex justify-center items-center gap-2 text-xs sm:text-lg  ${className} `}>
                    <MdModeEdit />
                    <span>Edit Profile</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50vw] max-h-[90vh] ">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make necessary changes to your profile
                    </DialogDescription>
                </DialogHeader>
                    <EditProfileForm/>
                <DialogFooter>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
    )
}

export default EditProfile
