"use client"
import React from 'react'
import Form from './Form/Form'
import { useSession } from 'next-auth/react';

const page = () => {

  const session = useSession();
  console.log('session', session);
  return (
    <div className=' min-h-screen text-black dark:bg-background bg-background dark:text-white relative '>
      <Form/>
    </div>
  )
}

export default page
