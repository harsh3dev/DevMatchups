"use client"
import React from 'react'

import Image from "next/image";
import { motion } from "framer-motion";
import {icons} from "@/app/Hero/icons";


const Logos = () => {
    return (
        <motion.div
            initial={{ filter: "blur(20px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 1 }} 
            className=" w-full grid place-items-center mt-20 gap-4 ">
                <h1 className=' font-semibold text-lg leading-loose  '>
                    Develop. Collaborate. Innovate.
                </h1>
            <div className=" max-w-[80%] flex flex-wrap justify-center items-center text-text px-4  gap-10 grayscale brightness-0 dark:brightness-[250%] opacity-80 dark:opacity-60 pointer-events-none ">
                <Image src={icons.devfolio_icon} width={80} height={80} alt="brand-image" className=" w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 aspect-square   dark:brightness-200 " />
                <Image src={icons.devpost_icon} width={80} height={80} alt="brand-image" className=" w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 aspect-square dark:brightness-200 " />
                <Image src={icons.github_icon} width={80} height={80} alt="brand-image" className=" w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 aspect-square  dark:brightness-200  " />
                <Image src={icons.sih_icon} width={80} height={80} alt="brand-image" className=" w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 aspect-square dark:brightness-200 " />
                <Image src={icons.grid_icon} width={80} height={80} alt="brand-image" className=" w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 aspect-square  dark:brightness-200  " />
                <Image src={icons.meta_icon} width={80} height={80} alt="brand-image" className="lg:w-24  w-14 sm:h-14 md:w-20 md:h-20 lg:h-24 aspect-square  dark:brightness-200 " />
                <Image src={icons.mlh_icon} width={80} height={80} alt="brand-image" className=" w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 aspect-square  dark:brightness-200  " />
                <Image src={icons.unstop_icon} width={80} height={80} alt="brand-image" className=" w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 aspect-square  dark:brightness-200  " />
            </div>
        </motion.div>
    )
}

export default Logos
