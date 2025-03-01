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
import useToggleForm from '@/hooks/useToggleForm'


interface PropInterface{
    className?: string,
}

const EditProfile:React.FC<PropInterface> = ({className}) => {
    const { isOpen,setIsOpen } = useToggleForm();
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className={`w-fit px-4 py-2 cursor-pointer font-semibold rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-black flex justify-center items-center gap-2 text-xs sm:text-lg  ${className} `}>
                    <MdModeEdit />
                    <span>Edit Profile</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50vw] max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make necessary changes to your profile
                    </DialogDescription>
                </DialogHeader>
                    <EditProfileForm setIsOpen={setIsOpen}/>
                <DialogFooter>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
    )
}

export default EditProfile
