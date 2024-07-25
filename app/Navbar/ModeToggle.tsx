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
    const localTheme=localStorage.getItem("theme");
    // console.log(localTheme);
    if(localTheme){
      setTheme(localTheme)
      if(localTheme==="light") setThemeToggle(true);
    }
    else setTheme("dark")
  },[]);


  useEffect(()=>{
    if(themeToggle){
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    else{
      setTheme("dark")
      localStorage.setItem("theme", "dark");
    }
  },[themeToggle])


  const handleThemeToggle=()=>{
    setThemeToggle((prev)=>!prev);
  }

  return (
      <Button variant="ghost" size="icon" onClick={()=>handleThemeToggle()} >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ease-linear " />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ease-linear dark:rotate-0 dark:scale-100" />
      </Button>
  )
}
