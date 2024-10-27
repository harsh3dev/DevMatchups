import Footer from '@/app/Footer/Footer'
import Navbar from '@/app/Navbar/Navbar'
import React from 'react'
import FormComponent from './FormComponent'


const page = () => {
    
    return (
        <div className=' min-h-screen bg-background text-text flex flex-col items-center justify-between relative gap-10  '>
        
        <Navbar />
        <div className='min-h-screen flex flex-col justify-start items-center '>
            <div className='w-full mt-5 p-10 rounded-2xl border border-dashed border-accent dark:border-accent grid place-items-center  '>
                <h1 className=' w-full p-2 text-2xl text-start font-bold '>
                    Just fill-up some necessary details!
                </h1>
                <hr className='text-text w-full my-4' />
                {/* <FormComponent/> */}
            </div>
        </div>

        <Footer />

        </div>
    )
}

export default page
