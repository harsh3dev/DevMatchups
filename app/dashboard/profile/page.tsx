"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { MdBugReport, MdOutlineAlternateEmail } from "react-icons/md";
import { FaBusinessTime, FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdModeEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

import UserImage from "./UserImage";
import Capsule from "./Capsule";
import { Skeleton } from "@/components/ui/skeleton";

import {
  fetchUser,
  selectUser,
  setUser,
} from "@/lib/store/features/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import EditProfile from "./EditProfile";
import axios from "axios";
import UserAvatar from "@/app/Navbar/UserAvatar";

const Page = () => {
  const { data: session, status: loading } = useSession();
  const userData = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id || !session?.user?.email) {
        console.log("No session data available");
        return;
      }

      if (userData.id === session.user.id && !userData.loading) {
        console.log("User data already loaded");
        return;
      }

      console.log("Fetching user data...");
      try {
        await dispatch(
          fetchUser({
            userId: session.user.id,
            email: session.user.email,
          }),
        ).unwrap();

        console.log("User data fetched successfully");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!isInitialized && session) {
      setIsInitialized(true);
      fetchUserData();
    }
  }, [dispatch, session, userData.id, userData.loading, isInitialized]);

  // Debug logging
  useEffect(() => {
    console.log("Current userData state:", userData);
    console.log("Current session state:", session);
    console.log("Current skills", userData.skills);
  }, [userData, session]);

  if (userData.loading) {
    return <div>Loading...</div>;
  }

  if (userData.error) {
    return <div>Error: {userData.error}</div>;
  }

  return (
    <div className="w-full h-full md:h-[95vh] p-5 bg-[#ebf8fb] dark:bg-[#03070C] border border-gray-700/80 dark:border-gray-500/80 flex flex-col justify-start items-start gap-5 ">
      <div className=" w-full lg:min-h-[200px] bg-gradient-to-t from-cyan-400/60 to-cyan-200/80 dark:from-blue-800/80 dark:to-indigo-900/80 rounded-md p-5 ">
        <div className=" w-full h-full flex lg:flex-row flex-col justify-between items-center gap-4  ">
          {/* UserImage and Details */}
          <div className=" flex flex-col justify-normal items-start ">
            {/* Loading UI Start */}
            {userData.loading ||
              (loading == "loading" && (
                <div className="flex justify-center items-center gap-5">
                  <Skeleton className="w-[100px] h-[100px] grid place-items-center rounded-full " />
                  <div className=" h-full flex flex-col gap-2 items-start justify-between">
                    <Skeleton className="w-[200px] h-6 " />
                    <Skeleton className="w-[200px] h-6 " />
                  </div>
                </div>
              ))}
            {userData.loading ||
              (loading == "loading" && (
                <div className="flex justify-start items-center gap-4 mt-4 ml-4 ">
                  <Skeleton className="w-14 h-8 rounded-full " />
                  <Skeleton className="w-14 h-8 rounded-full " />
                  <Skeleton className="w-14 h-8 rounded-full " />
                </div>
              ))}
            {/* Loading UI End */}

            {/* Authenticated User UI */}
            {!userData.loading && session && (
              <div className="flex justify-center items-center gap-5">
                <UserAvatar />
                <div className=" h-full flex flex-col gap-2 items-start justify-normal lg:justify-start ">
                  <h1 className=" text-base sm:text-xl md:text-2xl font-semibold text-text flex justify-center items-center gap-2 ">
                    {" "}
                    {userData.name}
                  </h1>
                  <h1 className=" text-base font-semibold text-text flex justify-center items-center gap-2 ">
                    {" "}
                    <MdOutlineAlternateEmail /> {userData.email}
                  </h1>
                </div>
              </div>
            )}

            {!userData.loading && session && (
              <div className="flex justify-start items-center gap-4 mt-4 ml-4 ">
                {userData.githubUrl ? (
                  <Link
                    target="_blank"
                    href={userData.githubUrl}
                    className="p-2 rounded-full px-4 border border-text flex justify-center items-center gap-2 dark:hover:bg-cyan-700/50 hover:bg-cyan-400/50 "
                  >
                    <FaGithub />
                    <span className="sm:inline-block hidden"> GitHub </span>
                  </Link>
                ) : (
                  <div className="p-2 rounded-full px-4 border border-gray-700 dark:border-gray-400 flex justify-center items-center gap-2 text-gray-700 dark:text-gray-400 ">
                    <FaGithub />
                    <span className="sm:inline-block hidden"> GitHub </span>
                  </div>
                )}
                {userData.linkedinUrl ? (
                  <Link
                    target="_blank"
                    href={userData.linkedinUrl}
                    className="p-2 rounded-full px-4 border border-text flex justify-center items-center gap-2 dark:hover:bg-cyan-700/50 hover:bg-cyan-400/50 "
                  >
                    <FaLinkedinIn />
                    <span className="sm:inline-block hidden">LinkedIn</span>
                  </Link>
                ) : (
                  <div className="p-2 rounded-full px-4 border border-gray-700 dark:border-gray-400 flex justify-center items-center gap-2 text-gray-700 dark:text-gray-400 ">
                    <span className="sm:inline-block hidden">LinkedIn</span>
                    <FaLinkedinIn />
                  </div>
                )}

                {userData.resumeUrl ? (
                  <Link
                    target="_blank"
                    href={userData.resumeUrl}
                    className="p-2 rounded-full px-4 border border-text flex justify-center items-center gap-2 dark:hover:bg-cyan-700/50 hover:bg-cyan-400/50 "
                  >
                    <HiOutlineGlobeAlt />
                    <span className="sm:inline-block hidden">Website</span>
                  </Link>
                ) : (
                  <div className="p-2 rounded-full px-4 border border-gray-700 dark:border-gray-400 flex justify-center items-center gap-2 text-gray-700 dark:text-gray-400 ">
                    <HiOutlineGlobeAlt />
                    <span className="sm:inline-block hidden">Website</span>
                  </div>
                )}
                <EditProfile className="text-xs sm:hidden" />
              </div>
            )}
          </div>

          {/* Edit Profile */}
          <div className=" hidden h-full sm:flex lg:flex-col justify-start items-start gap-4 ">
            <EditProfile className="" />
          </div>
        </div>
      </div>

      <div className=" w-full h-full rounded-md p-5 border border-foreground dark:border-foreground  ">
        <div className=" w-full flex flex-col justify-between items-start gap-2 ">
          <div className="mb-4 w-full lg:max-w-[50%] ">
            <h1 className="text-lg md:text-3xl font-bold mb-5 text-gray-700 dark:text-gray-400 ">
              Your Skills
            </h1>
            <div className="w-full flex flex-wrap justify-start items-start gap-2 p-2 rounded-md">
              {Array.isArray(userData.skills) ? (
                userData.skills.length > 0 ? (
                  userData.skills.map((skill, index) => {
                    const formattedSkill = skill.trim();
                    const capitalizedSkill = formattedSkill.charAt(0).toUpperCase() + formattedSkill.slice(1);
                    return <Capsule key={index} item={capitalizedSkill} />;
                  })
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No skills available.</p>
                )
              ) : typeof userData.skills === 'string' ? (
                userData.skills.split(',').length > 0 ? (
                  userData.skills.split(',').map((skill: string, index: number) => {
                    const formattedSkill = skill.trim();
                    const capitalizedSkill = formattedSkill.charAt(0).toUpperCase() + formattedSkill.slice(1);
                    return <Capsule key={index} item={capitalizedSkill} />;
                  })
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No skills available.</p>
                )
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No skills available.</p>
              )}
            </div>

          </div>
          <div className="my-8 w-full lg:max-w-[70%]  ">
            <h1 className=" text-lg md:text-3xl font-bold mb-5 text-gray-700 dark:text-gray-400  ">
              About Me
            </h1>
            {userData.loading && (
              <Skeleton className=" min-h-[100px] min-w-full rounded-lg " />
            )}

            {!userData.loading && (
              <div className="w-full  gap-2 ">
                {userData.bio ? (
                  <p className=" text-base md:text-lg text-text dark:text-white ">
                    {userData.bio}
                  </p>
                ) : (
                  <p className=" text-base md:text-lg min-h-[100px] min-w-full border border-dashed border-gray-700 dark:border-gray-500/50 rounded-lg flex justify-center items-center gap-2 text-gray-700 dark:text-gray-500 ">
                    <IoIosAddCircleOutline /> Describe something interesting
                    about yourself here!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
