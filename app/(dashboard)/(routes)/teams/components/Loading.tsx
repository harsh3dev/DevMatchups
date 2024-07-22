import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
    
    return (
        <>
            <Skeleton className="w-[20rem] h-[20rem] rounded-lg" />
            <Skeleton className="w-[20rem] h-[20rem] rounded-lg" />
            <Skeleton className="w-[20rem] h-[20rem] rounded-lg" />
            <Skeleton className="w-[20rem] h-[20rem] rounded-lg" />
            <Skeleton className="w-[20rem] h-[20rem] rounded-lg" />
            <Skeleton className="w-[20rem] h-[20rem] rounded-lg" />
        </>
    )
}

export default Loading
