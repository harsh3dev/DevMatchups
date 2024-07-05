"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import { MdEmail } from "react-icons/md";
import GitHubButton from 'react-github-btn'

export default function Footer() {
  return (
    <footer className="w-full border border-t border-r-0 border-b-0 border-l-0 border-gray-500 text-text bg-primary pt-[0.1rem] " style={{clipPath: "polygon(50% 0%, 94.4% 0%, 100.1% 15.5%, 100.1% 100.3%, 0% 100.3%, 0% 16.5%, 5.2% 0%)"}} >
      <div className="grid place-items-center mx-auto w-full py-10 bg-background backdrop-blur-xl " style={{clipPath: "polygon(50% 0%, 94.4% 0%, 100.1% 15.5%, 100.1% 100.3%, 0% 100.3%, 0% 16.5%, 5.2% 0%)"}} >
        <div className="w-full h-full hidden dark:inline-block inset-0 dark:absolute bottom-0 left-0 -z-0 ">
          <svg width="100%" height="100%" viewBox="0 0 4616 1875" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1714_54" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="4616" height="1875">
              <rect width="4616" height="1875" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1714_54)">
              <g opacity="0.83" filter="url(#filter0_f_1714_54)">
                <path d="M806.722 5561.01C-41.9862 5137.27 -291.816 3916.12 248.711 2833.5C789.239 1750.88 1915.44 1216.75 2764.14 1640.49C3150.96 1833.62 3501.27 2236.28 3716.82 2719.85C3974.21 3297.27 4039.46 3990.07 3745.29 4579.26C3456.07 5158.53 2761.71 4625.76 2156.73 4772.02C1631.03 4899.11 1201.32 5758.02 806.722 5561.01Z" fill="#236BCF" />
              </g>
            </g>
            <defs>
              <filter id="filter0_f_1714_54" x="-804.315" y="727.522" width="5511.29" height="5630.31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="383.8" result="effect1_foregroundBlur_1714_54" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="w-full h-full dark:hidden inset-0 absolute bottom-0 left-0 -z-0 scale-100  ">
          <svg width="100%" height="100%" viewBox="0 0 4616 1875" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1714_54" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="4616" height="1875">
              <rect width="4616" height="1875" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1714_54)">
              <g opacity="0.58" filter="url(#filter0_f_1714_54)">
                <ellipse cx="2114.2" cy="2560.34" rx="1104.14" ry="2055.93" transform="rotate(82.3096 2114.2 2560.34)" fill="#0819B5" />
              </g>
            </g>
            <defs>
              <filter id="filter0_f_1714_54" x="-723.383" y="637.1" width="5675.16" height="3846.47" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="397.35" result="effect1_foregroundBlur_1714_54" />
              </filter>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 ">
          <div className="gap-2 flex flex-col">
            <h1 className="text-3xl font-bold">DevMatchups</h1>
            <h1>Created by <Link href={'https://www.linkedin.com/in/harsh3dev/'} target="_blank" className="font-semibold hover:text-accent transition-all ease-linear scale-[0.2] " >Harsh Pandey</Link> & <Link href={'https://www.linkedin.com/in/yash-gupta-64956b246/'} target="_blank" className="font-semibold hover:text-accent transition-all ease-linear scale-[0.2] " >Yash Gupta</Link> </h1>
          </div>
          <div className="flex flex-wrap justify-normal md:justify-between items-center gap-20 " >
            <div className="space-y-4  ">
              <h3 className="text-2xl font-bold">Contribute</h3>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <GitHubButton href="https://github.com/harsh3dev/DevMatchups" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star harsh3dev/DevMatchups on GitHub">Star</GitHubButton>
                </li>
                <li>
                  <GitHubButton href="https://github.com/sponsors/harsh3dev" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-heart" data-size="large" aria-label="Sponsor @harsh3dev on GitHub">Sponsor</GitHubButton>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Contact</h3>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <Button variant="link" className=" border border-text "  >
                    <Link className="flex justify-center items-center gap-2" href="mailto:yaahg342@gmail.com" target="_blank">
                      <MdEmail />
                      yaahg342@gmail.com
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button variant="link" className=" border border-text "  >
                    <Link className="flex justify-center items-center gap-2" href="mailto:harshpandey.tech@gmail.com" target="_blank">
                      <MdEmail />
                      harshpandey.tech@gmail.com
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
