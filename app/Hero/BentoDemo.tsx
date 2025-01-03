"use client"
import {
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
    } from "@radix-ui/react-icons";


import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { AnimatePresence, motion } from "framer-motion";
// import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
    
const features = [
    {
    Icon: FileTextIcon,
    name: "Upload Resume and Connect GitHub",
    description: "Enhance your profile by uploading your resume and linking your GitHub account.",
    href: "/login",
    cta: "Learn more",
    background: (<AnimatePresence>
            <div className="h-full w-full absolute inset-0">
              {/* <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-gray-950/80"
                colors={[[207, 250, 254]]}
                dotSize={2}
              /> */}
            </div>
          </AnimatePresence>),
    className: "lg:row-start-4 lg:row-end-6 lg:col-start-3 lg:col-end-5",
    },
    {
    Icon: InputIcon,
    name: "Create Your Team",
    description: "Set up your profile and start building your dream team.",
    href: "/signup",
    cta: "Get started",
    background: (<AnimatePresence>
            <div className="h-1/2 w-1/2 absolute right-0 top-0">
              {/* <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-cyan-500/80"
                colors={[
                  [255, 255, 255],
                  [255, 255, 255],
                ]}
                dotSize={2}
              /> */}
            </div>
          </AnimatePresence>),
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3",
    },
    {
    Icon: GlobeIcon,
    name: "Discover Teams Matching Your Skill Set",
    description: "Browse through a curated list of teams actively looking for members with your expertise.",
    href: "/teams",
    cta: "Find teams",
    background: (<AnimatePresence>
            <div className="h-full w-full absolute inset-0">
              {/* <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-emerald-600/80"
                colors={[
                    [236, 72, 153],
                    [232, 121, 249],
                  ]}
                dotSize={2}
              /> */}
            </div>
          </AnimatePresence>),
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-6",
    },
    
    {
    Icon: CalendarIcon,
    name: "Explore Upcoming Hackathons",
    description: "Keep track of upcoming hackathon events globally and find ones that align with your goals.",
    href: "/hackathons",
    cta: "Explore Hackathons",
    background: (<AnimatePresence>
            <div className="h-full w-full absolute inset-0">
              {/* <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-900/80"
                colors={[[209, 250, 229]]}
                dotSize={2}
              /> */}
            </div>
          </AnimatePresence>),
    className: "lg:col-start-3 lg:col-end-5  lg:row-start-1 lg:row-end-4",
    },
];

export async function BentoDemo() {
    return (
    <BentoGrid className=" grid-cols-1 grid-rows-4 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-5 lg:grid-cols-4 ">
        {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
        ))}
    </BentoGrid>
    );
}
