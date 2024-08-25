import React from 'react'
import { FiCode } from "react-icons/fi";
import { IoTriangleSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { GlobeDemo } from "./GlobeDemo";


const GlobeComponent = () => {
    return (
        <div className=" w-full min-h-[300px] grid place-items-center  -mt-44 ">
            <div className=" sm:max-w-[80%] h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 place-items-center ">
                <div className="flex flex-col lg:text-left text-center justify-normal lg:items-start items-center gap-5 ">
                    <h1 className=" text-text text-3xl lg:text-6xl font-bold text-wrap ">
                        Find Teammates Around the World
                    </h1>
                    <p className=" bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-800 dark:from-gray-100 dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-medium text-wrap ">
                        Discover like-minded developers across different time zones, experience levels, and tech stacks.
                    </p>

                </div>
                <div className=" grid place-items-center w-full h-full ">
                    <GlobeDemo />
                </div>
            </div>

            <div className=" max-w-[80%] flex justify-center items-center ">
                <div className=" w-full flex flex-wrap justify-center items-center gap-2  text-center text-sm leading-tight font-light  ">
                    <span className=" py-2 px-4 text-text border border-accent rounded-full flex justify-center items-center gap-2 divide-x divide-text ">
                        <FiCode className="  text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] " />
                        Match teammates by skills.
                    </span>
                    <span className=" py-2 px-4 text-text border border-accent rounded-full flex justify-center items-center gap-2 divide-x  ">
                        <IoTriangleSharp className=" text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] " />
                        Seamless global collaboration.
                    </span>
                    <span className=" py-2 px-4 text-text border border-accent rounded-full  flex justify-center items-center gap-2 divide-x  ">
                        <IoFilter className=" text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] " />
                        Filter by role, experience, and tech stack.
                    </span>
                </div>
            </div>

        </div>
    )
}

export default GlobeComponent
