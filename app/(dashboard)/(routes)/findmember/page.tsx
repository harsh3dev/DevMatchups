import React from 'react'
import Form from './Form/Form'

const Page = () => {
	return (
		<main className='min-h-screen text-text dark:text-text relative flex flex-col items-center justify-between w-full '>
			<div className="absolute dark:hidden inset-0 h-full w-full z-0 bg-backgrou bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
			<div className="dark:absolute hidden dark:block top-0  z-0 h-full w-full dark:bg-background  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			<Form/>
		</main>
	)
}

export default Page
