"use client"
import React, { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HackathonEntry } from '@/app/(dashboard)/(routes)/findmember/Form/types';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card"
import {Linkedin, Mail, MapPin, User } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import Spinner from "@/app/assets/Spinner"
import CopyButton from '@/components/CopyButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export default function Page({ params }: { params: { id: string } }) {
    const [post,setPost] = useState<HackathonEntry>();

    const router = useRouter();

    const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [resume, setResume] = useState<File | null>(null)
    const [resumeUrl, setResumeUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isApplied, setIsApplied] = useState(false)

    const [userData, setUserData] = useState<any>();

    const [user, setUser] = useState<any>();

    const session = useSession();

    useEffect(()=>{
        getSPostData();
    },[]);
    useEffect(() => {
        const fetchUserData = async () => {
            if (!session.data?.user?.id || !session.data?.user?.email) {
                console.log("No session data available");
                return;
            }
            console.log("Fetching user data...");
            try {
                const response = await axios.get(`/api/user?id=${session.data.user.id}`);
                console.log("User data fetched successfully");
                const userData = response.data.user;
                setUserData(userData);
                console.log("User data:", response.data);
                setLinkedinUrl(userData?.linkedinUrl as string);
                setGithubUrl(userData?.githubUrl as string);
                setResumeUrl(userData?.resumeUrl as string);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [session]);
    useEffect(()=>{
        if(isApplied)
            toast.success("Applied successfully")
    },[isApplied]);

    const applied = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
    
        const id = params.id;
    
        // Ensure all required fields are present
        if (linkedinUrl && githubUrl && (resume || resumeUrl)) {
            console.log("Applying with LinkedIn:", linkedinUrl, "GitHub:", githubUrl, "and Resume:", resume?.name);
            console.log("Resume type from client:", resume?.type);
    
            // Create form data to send to the server
            const formData = new FormData();
            formData.append('linkedinUrl', linkedinUrl);
            formData.append('githubUrl', githubUrl);
            formData.append('resumeUrl', resumeUrl || ''); // Resume URL if it exists
            formData.append('candidateId', userData.id);
            formData.append('postId', id);

            console.log("Form data:", userData.id);
    
            // If a new resume file is provided, append it to the form data
            if (resume) {
                formData.append('resume', resume);
            }
    
            try {
                const res = await axios.post('/api/apply', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                console.log("Response:", res);
                console.log("Applied successfully");
                setIsApplyDialogOpen(false); 
                setIsApplied(true);
            } catch (error) {
                console.error('Error applying:', error);
            }
        }
    };
    

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResume(e.target.files[0])
        }
    }

    const getSPostData = async ()  => {
        try {
          setLoading(true);
          const id = params.id;
          const res = await axios.post('/api/id', { id: id });
          console.log("response",res);
          if (!res.data) {
              return;
          }
           console.log("posts",res.data.hackathon); 
           const userId = res.data.hackathon.userId;
            console.log("userId",userId);
            const user = await axios.get(`/api/user?id=${userId}`);
            setUser(user.data.user);
            console.log("user",user.data);
           setPost(res.data.hackathon);
        } 
        catch (error) {
          console.error('Error fetching post data:', error);
        }
        finally {
            setLoading(false);
        }
      };
   
    return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between bg-background ">

        {
            loading ? (
                <div className='--outerbox animate-pulse rounded-md border border-gray-700 w-full md:w-[600px] h-[600px] dark:border-gray-400  text-text dark:text-text my-14 p-10 bg-gradient-to-tr from-violet-300 via-violet-200 to-slate-100 dark:from-violet-600 dark:via-indigo-900 dark:to-slate-900 flex justify-center items-center  '>
                    <h1 className=' font-bold text-xl lg:font-extrabold lg:text-3xl mb-2 flex items-center justify-center gap-0 '>
                        Hackathon Data is {"\t"} <span className=' ml-2 flex justify-center items-center gap-0'>L<Spinner className="m-0 h-8 w-8 inline " />ADING</span>
                    </h1>
                </div>
            )
            :
            <div className='--outerbox rounded-md border border-gray-700 w-full dark:border-gray-400 max-w-[90%] text-text dark:text-text my-14 p-10 bg-gradient-to-tr from-violet-300 via-violet-200 to-slate-100 dark:from-violet-600 dark:via-indigo-900 dark:to-slate-900 '>
                <h1 className=' font-bold text-xl lg:font-extrabold lg:text-3xl mb-2 '>
                    {post?.hackathonName} - {post?.teamName}
                </h1>
                <div className='w-full flex justify-between items-start gap-10 mx-auto my-2'>
                    <div className='h-full w-full flex-nowrap lg:col-span-3 mr-2 '>
                        <h1 className='flex justify-start items-center gap-1 text-base text-gray-800 dark:text-gray-300 '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mt-px">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"></path>
                            </svg> There are {post?.memberCount} open applications for this team!</h1>

                        <div className='w-full flex flex-col justify-center items-start gap-2 text-lg '>
                            <div className=' flex justify-center items-center gap-4 my-4 flex-wrap text-nowrap '>
                                <Badge variant="secondary" className=" text-xs sm:text-sm px-3 py-1">
                                    <span className="w-2 h-2 mr-1 rounded-full bg-green-500 " />
                                    {post?.hackathonMode}
                                </Badge>
                                <Badge variant="secondary" className=" text-xs sm:text-sm px-3 py-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {post?.location}
                                </Badge>
                                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className=" border-white ">
                                            Contact Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-white text-gray-800">
                                        <DialogHeader></DialogHeader>
                                        <ContactDetails post={post!} user={user} />
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <Link href={post?.regURL || ""} className='font-semibold text-gray-800/100 dark:text-gray-300/100 ' >Register here: <h1 className='text-primary hover:underline hover:underline-offset-1 dark:text-primary transition-all ease-linear' >{post?.regURL}</h1> </Link> 

                           <h1 className='font-semibold flex items-center flex-wrap text-nowrap justify-start gap-2 text-gray-800/100 dark:text-gray-300/100' >Last Date to register: 
                            <h2 className=' font-extrabold text-xl  flex justify-center items-center gap-1'>
                                    <Badge variant="secondary" className=" text-xs sm:text-sm px-3 py-1">
                                        <FaCalendarAlt className="w-4 h-4 mr-1 rounded-full " />
                                        {formatDate(post?.regDate)}
                                    </Badge>
                                </h2> 
                            </h1>  

                            <h1 className='font-semibold text-gray-800/100 dark:text-gray-300/100 '>Position: <span className='font-bold text-lg lg:text-xl  text-text font-mono '>{post?.role} with {post?.experience}</span> of experience. </h1>

                            <h1 className='flex items-center justify-start gap-2 font-semibold flex-wrap text-gray-800/100 dark:text-gray-300/100  '>Skills: {post?.skills.map((skill:string, index:number)=>(
                                <span key={index} className='p-1 px-2 rounded-full text-text text-base border border-text dark:border-text'>{skill}</span>
                            ))}</h1>
                            
                            <p className=' rounded-md my-8 p-4 mr-1 w-full border md:pl-8 '>
                                <h1 className='w-full font-semibold  underline underline-offset-4 decoration-dashed mb-2  '>Description:</h1>
                                {'"'}{post?.description} {'"'}
                            </p>
                        </div>
                        {userData?.id === user?.id ?
                            <Button onClick={() => router.push('/dashboard')} className='bg-primary font-medium dark:font-bold transition-colors ease-in-out w-full'>
                                View Applications
                            </Button>
                            :
                            <ApplyComponent
                                isApplyDialogOpen={isApplyDialogOpen}
                                setIsApplyDialogOpen={setIsApplyDialogOpen}
                                linkedinUrl={linkedinUrl}
                                setLinkedinUrl={setLinkedinUrl}
                                githubUrl={githubUrl}
                                setGithubUrl={setGithubUrl}
                                resume={resume}
                                setResume={setResume}
                                resumeUrl={resumeUrl}
                                setResumeUrl={setResumeUrl}
                                applied={applied}
                                handleResumeChange={handleResumeChange}
                            />
                        }
                    </div>
                </div>
            </div>
        }
        </main>
    </>
    )
}


function ContactDetails({post, user}: {post: HackathonEntry, user: any}) {
    return (
      <Card className="w-full max-w-md mx-auto bg-transparent dark:bg-transparent backdrop-blur border-text dark:border-text ">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.image} alt="Profile picture" />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{post?.teamName}</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6" />
              <span className="text-sm">{user.email}</span>
              <CopyButton text={user.email} />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Link href={user.linkedinUrl}>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
              </Link>
              <Link href={user.githubUrl}>
                  <Button className="flex-1 bg-gray-800 hover:bg-gray-900">
                    <FaGithub className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

function ApplyComponent ({
    isApplyDialogOpen,
    setIsApplyDialogOpen,
    linkedinUrl,
    setLinkedinUrl,
    githubUrl,
    setGithubUrl,
    resume,
    setResume,
    resumeUrl,
    setResumeUrl,
    applied,
    handleResumeChange,
    }:{
    isApplyDialogOpen: boolean,
    setIsApplyDialogOpen: (isOpen: boolean) => void,
    linkedinUrl: string,
    setLinkedinUrl: (linkedinUrl: string) => void,
    githubUrl: string,
    setGithubUrl: (githubUrl: string) => void,
    resume: File | null,
    setResume: (resume: File | null) => void,
    resumeUrl: string,
    setResumeUrl: (resumeUrl: string) => void,
    applied: (e: React.FormEvent<HTMLFormElement>) => void,
    handleResumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    }) {
    return (
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsApplyDialogOpen(true)} className='bg-primary font-medium dark:font-bold transition-colors ease-in-out w-full'>
                    Apply as a teammate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply as a teammate</DialogTitle>
                </DialogHeader>

                {/* Form to handle the apply submission */}
                <form onSubmit={applied}>
                    <div className="grid gap-4 py-4">
                        {/* LinkedIn URL */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="linkedin" className="text-right">
                                LinkedIn URL
                            </Label>
                            <Input
                                id="linkedin"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>

                        {/* GitHub URL */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="github" className="text-right">
                                GitHub URL
                            </Label>
                            <Input
                                id="github"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>

                        {/* Resume Input */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resume" className="text-right">
                                Resume
                            </Label>
                            {resumeUrl && resumeUrl.length > 0 ? (
                                <Link href={resumeUrl} className='col-span-3 flex justify-start items-center gap-2 text-primary hover:underline dark:text-primary transition-all ease-linear'>
                                    <span>View Resume</span>
                                </Link>
                            ) : (
                                <Input
                                    id="resume"
                                    type="file"
                                    onChange={handleResumeChange}
                                    className="col-span-3"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            )}
                        </div>
                    </div>

                    {/* Form submit button */}
                    <DialogFooter>
                        <Button type="submit" disabled={!linkedinUrl || !githubUrl || (!resume && !resumeUrl)}>
                            Continue Application
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function formatDate(inputDate: any): string {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
}