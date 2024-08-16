import React from "react";
import Link from "next/link";
import Image from "next/image";
import VercelDark from '@/app/assets/vercel-logotype-dark.svg'
import VercelLight from '@/app/assets/vercel-logotype-light.svg'

const PoweredByVercel = () => {
    return (
        <>
        <div className="flex flex-wrap justify-normal md:justify-between gap-20 md:h-full ">
            <div className=" flex justify-between items-center h-full gap-4  ">
            <Link
                href="https://vercel.com/docs"
                target="_blank"
                className=" text-sm md:text-base "
            >
                Powered by {"\t"}
                <Image
                src={VercelDark}
                height={70}
                width={60}
                alt="vercel-dark"
                className=" dark:hidden inline-block ml-2 "
                />
                <Image
                src={VercelLight}
                height={70}
                width={60}
                alt="vercel-light"
                className=" dark:inline-block hidden ml-2 "
                />
            </Link>
            </div>
        </div>
        </>
    );
};

export default PoweredByVercel;
