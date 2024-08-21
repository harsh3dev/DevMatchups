"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { setSearch } from "@/lib/store/features/filterSlice/filterSlice";
import { useDispatch, UseDispatch } from "react-redux";

export function PlaceholdersAndVanishInput({
	placeholders,
	onChange,
	onSubmit,
}: {
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		let interval: any;
		const startAnimation = () => {
			interval = setInterval(() => {
				setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
			}, 1500);
		};
		startAnimation();
		return () => clearInterval(interval);
	}, [placeholders.length]);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");
	const [animating, setAnimating] = useState(false);

	const draw = useCallback(() => {
		if (!inputRef.current) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = 800;
		canvas.height = 800;
		ctx.clearRect(0, 0, 800, 800);
		const computedStyles = getComputedStyle(inputRef.current);

		const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
		ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
		ctx.fillStyle = "#FFF";
		ctx.fillText(value, 16, 40);

		const imageData = ctx.getImageData(0, 0, 800, 800);
		const pixelData = imageData.data;
		const newData: any[] = [];

		for (let t = 0; t < 800; t++) {
			let i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				let e = i + 4 * n;
				if (
					pixelData[e] !== 0 &&
					pixelData[e + 1] !== 0 &&
					pixelData[e + 2] !== 0
				) {
					newData.push({
						x: n,
						y: t,
						color: [
							pixelData[e],
							pixelData[e + 1],
							pixelData[e + 2],
							pixelData[e + 3],
						],
					});
				}
			}
		}

		newDataRef.current = newData.map(({ x, y, color }) => ({
			x,
			y,
			r: 1,
			color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		}));
	}, [value]);

	useEffect(() => {
		draw();
	}, [value, draw]);

	const animate = (start: number) => {
		const animateFrame = (pos: number = 0) => {
			requestAnimationFrame(() => {
				const newArr = [];
				for (let i = 0; i < newDataRef.current.length; i++) {
					const current = newDataRef.current[i];
					if (current.x < pos) {
						newArr.push(current);
					} else {
						if (current.r <= 0) {
							current.r = 0;
							continue;
						}
						current.x += Math.random() > 0.5 ? 1 : -1;
						current.y += Math.random() > 0.5 ? 1 : -1;
						current.r -= 0.05 * Math.random();
						newArr.push(current);
					}
				}
				newDataRef.current = newArr;
				const ctx = canvasRef.current?.getContext("2d");
				if (ctx) {
					ctx.clearRect(pos, 0, 800, 800);
					newDataRef.current.forEach((t) => {
						const { x: n, y: i, r: s, color: color } = t;
						if (n > pos) {
							ctx.beginPath();
							ctx.rect(n, i, s, s);
							ctx.fillStyle = color;
							ctx.strokeStyle = color;
							ctx.stroke();
						}
					});
				}
				if (newDataRef.current.length > 0) {
					animateFrame(pos - 8);
				} else {
					setValue("");
					setAnimating(false);
				}
			});
		};
		animateFrame(start);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !animating) {
			vanishAndSubmit();
		}
	};

	const vanishAndSubmit = () => {
		setAnimating(true);
		draw();

		const value = inputRef.current?.value || "";
		dispatch(setSearch(''));
		if (value && inputRef.current) {
			const maxX = newDataRef.current.reduce(
				(prev, current) => (current.x > prev ? current.x : prev),
				0
			);
			animate(maxX);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		vanishAndSubmit();
		onSubmit && onSubmit(e);
	};
	return (
		<form
			className={cn(
				"w-full relative max-w-xl mx-auto bg-transparent border border-accent backdrop-blur-lg dark:border-accent h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
				value && "bg-transparent",
				
			)}
			onSubmit={handleSubmit}
		>
			
			<canvas
				className={cn(
					"absolute pointer-events-none  text-base transform scale-50 top-[20%] left-10 origin-top-left filter invert dark:invert-0 pr-20",
					
					!animating ? "opacity-0" : "opacity-100"
				)}
				ref={canvasRef}
			/>
			<span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none font-bold ">
			<svg width="18" height="18" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
			</span>
			<input
				onChange={(e) => {
					if (!animating) {
						setValue(e.target.value);
						onChange && onChange(e);
					}
				}}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				value={value}
				type="text"
				className={cn(
					"w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-10 pr-20",
					animating && "text-transparent dark:text-transparent"
				)}
			/>

			<button
				disabled={!value}
				type="submit"
				className="absolute z-0 right-2 top-1/2  -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-slate-800 bg-sky-500 dark:bg-cyan-500 dark:disabled:bg-cyan-800 transition duration-200 flex items-center justify-center"
				style={{opacity : value ? "100" : "0"}}
			>

				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-cyan-200 h-4 w-4"
				>
					<g id="SVGRepo_bgCarrier" strokeWidth="0"/>


					
					<motion.g
						id="SVGRepo_tracerCarrier" 
						strokeLinecap="round" 
						strokeLinejoin="round"
						initial={{
							strokeDasharray: "50%",
							strokeDashoffset: "50%",
						}}
						animate={{
							strokeDashoffset: value ? 0 : "50%",
						}}
						transition={{
							duration: 0.3,
							ease: "linear",
						}}
					/>
				 <g id="SVGRepo_iconCarrier"> <path d="M8 8L16 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <path d="M16 8L8 16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
				</motion.svg>
			</button>

			<div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
				<AnimatePresence mode="wait">
					{!value && (
						<motion.p
							initial={{
								y: 5,
								opacity: 0,
							}}
							key={`current-placeholder-${currentPlaceholder}`}
							animate={{
								y: 0,
								opacity: 1,
							}}
							exit={{
								y: -15,
								opacity: 0,
							}}
							transition={{
								duration: 0.3,
								ease: "linear",
							}}
							className="text-slate-600 text-sm sm:text-base font-normal dark:text-gray-300 px-10 text-left w-[calc(100%-2rem)] truncate"
						>
							{placeholders[currentPlaceholder]}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</form>
	);
}
