"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FiCode } from "react-icons/fi";
import { IoTriangleSharp } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import Image from 'next/image';
import globeimg from '@/app/assets/globe-img.gif';

import { Search } from 'lucide-react';


const GlobeComponent = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
    const animationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const spanVariants = {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            delay: 1,
        },
        },
    };

    return (
        <div className=" w-full min-h-[250px] grid place-items-center mb-10 -mt-48 ">
            <div className=" sm:max-w-[80%] w-full h-full grid lg:grid-cols-2 gap-6 p-4  ">
                <div ref={ref} className="flex flex-col lg:text-left text-center justify-normal lg:items-start items-center gap-5 ">
                    <motion.h1
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={animationVariants}
                    transition={{ duration: 1.5 }}
                    style={{ marginBottom: "20px" }}
                    className=" text-text text-3xl lg:text-6xl font-bold text-wrap ">
                        Find Teammates Around the World
                    </motion.h1>
                    <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={animationVariants}
                    transition={{ duration: 1.5, delay: 0.5 }} 
                    className=" bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-800 dark:from-gray-100 dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-medium text-wrap ">
                        Discover like-minded developers across different time zones, experience levels, and tech stacks.
                    </motion.p>

                    <div className="w-full flex justify-center lg:justify-start items-center mt-5 ">
                        <div className=" w-full flex flex-wrap justify-center lg:justify-normal items-center gap-2  text-center text-sm leading-tight font-light  ">
                            <motion.span
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={spanVariants}
                            transition={{ duration: 1, delay: 1 }}
                            style={{ marginBottom: "10px" }} 
                            className=" py-2 px-4 text-text border border-accent rounded-full flex justify-center items-center gap-2 divide-x divide-text ">
                                <FiCode className="  text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] " />
                                Match teammates by skills.
                            </motion.span>

                            <motion.span
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={spanVariants}
                            transition={{ duration: 1, delay: 4 }} 
                            style={{ marginBottom: "10px" }} 
                            className=" py-2 px-4 text-text border border-accent rounded-full flex justify-center items-center gap-2 divide-x  ">
                                <IoTriangleSharp className=" text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] " />
                                Seamless global collaboration.
                            </motion.span>

                            <motion.span
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={spanVariants}
                            transition={{ duration: 1, delay: 6 }} 
                            style={{ marginBottom: "10px" }} 
                            className=" py-2 px-4 text-text border border-accent rounded-full  flex justify-center items-center gap-2 divide-x  ">
                                <IoFilter className=" text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] " />
                                Filter by role, experience, and tech stack.
                            </motion.span>
                            <motion.span
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={spanVariants}
                            transition={{ duration: 1, delay: 6 }} 
                            style={{ marginBottom: "10px" }} 
                            className=" py-2 px-4 text-text border border-accent rounded-full  flex justify-center items-center gap-2 divide-x  ">
                                <Search className=" text-[rgb(0,0,255)] dark:text-[rgb(0,255,255)] w-4 h-4 " />
                                Explore worldwide hackathons.
                            </motion.span>
                        </div>
                    </div>

                </div>
                <div className=" relative grid place-items-center w-full min-h-[24rem] sm:max-md:mt-14 xl:m-0 sm:min-h-[28rem] lg:h-fit  ">
                    <Image src={globeimg}  alt="globe" width={400} height={400} layout="intrinsic" className=' ' />
                </div>
            </div>

        </div>
    )
}

export default GlobeComponent
