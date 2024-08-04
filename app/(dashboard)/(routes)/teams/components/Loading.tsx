import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
    
    return (
        <>
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
            <Skeleton className=" min-w-[20vw] min-h-[20vh] px-5 py-4 rounded-lg" />
        </>
    )
}

export default Loading
