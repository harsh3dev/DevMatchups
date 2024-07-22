"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import { MdEmail } from "react-icons/md";
import GitHubButton from 'react-github-btn'

export default function Footer() {
  return (
    <footer className="w-full border border-t border-r-0 border-b-0 border-l-0 border-gray-500 text-text bg-primary pt-[0.1rem] "   >
      <div className="grid place-items-center mx-auto w-full py-10 bg-background backdrop-blur-xl "   >
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
