"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import { useEffect } from "react"

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [themeToggle, setThemeToggle]=React.useState(false);

  useEffect(()=>{
    setTheme("system");
  },[]);

  useEffect(()=>{
    if(themeToggle)
      setTheme("light");
    else
      setTheme("dark")
  },[themeToggle]);




  return (
    <>
      <Button variant="outline" size="icon" onClick={()=>setThemeToggle((prev)=>!prev)} >
        {themeToggle && <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
        { !themeToggle && <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />}
      </Button>
    </>
  )
}
