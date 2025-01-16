import React from "react";
import Image from "next/image";
import { BentoDemo } from "./BentoDemo";

const ProcessFlow = () => {
    const content = [
        {
        title: "Create Your Team",
        description: "Set up your profile and start building your dream team by specifying your goals and preferred tech stack. Highlight your skills, share your hackathon experience, and attract like-minded developers who share your vision.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Collaborative Editing 1
            </div>
        ),
        },
        {
        title: "Discover Teams Matching Your Skill Set",
        description: "Browse through a curated list of teams actively looking for members with your expertise. Use our powerful search filters to find teams that match your technical skills, interests, and experience level, ensuring you find the best fit for your hackathon journey.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Collaborative Editing 2
            </div>
        ),
        },
        {
        title: "Explore Upcoming Hackathons",
        description: "Keep track of upcoming hackathon events globally and find ones that align with your goals. Our platform provides you with detailed event information, including themes, timelines, and requirements, so you can join teams that are ready to compete and win.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Collaborative Editing 3
            </div>
        ),
        }
        ]
    return (
        <div className="w-full flex flex-col justify-normal items-center gap-4 mt-10 px-4 md:px-0 ">
            <div className=" text-left text-text w-full flex flex-col justify-normal items-start gap-4 my-8  ">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/95">
                How It Works?
                </h1>
                <p className="text-base text-gray-700 dark:text-gray-400 font-light ">
                Our platform makes it simple to connect with skilled developers worldwide and join or create hackathon-ready teams. Whether you{"'"}re looking to collaborate on an exciting new project or find the perfect team for an upcoming hackathon, here{"'"}s how it works.
                </p>
            </div>
            <BentoDemo/>
        </div>
    )
}

export default ProcessFlow
