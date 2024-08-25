import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

export async function AnimatedShinyTextDemo() {
	return (
		<Link href={'https://github.com/harsh3dev/DevMatchups'} target="_blank" className="z-10 flex min-h-fit items-center justify-center">
		<div
			className={cn(
			"group rounded-full border border-black/5 bg-sky-100 text-base text-text transition-all ease-in hover:cursor-pointer hover:bg-sky-400/10 dark:border-white/5 dark:bg-sky-900/30 dark:hover:bg-sky-500/20",
			)}
		>
			<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-accent hover:duration-300 hover:dark:text-accent">
			<span className=" flex justify-center items-center gap-2 ">
				<FaGithub/>
				We are Open Source</span>
			<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
			</AnimatedShinyText>
		</div>
		</Link>
	);
}
