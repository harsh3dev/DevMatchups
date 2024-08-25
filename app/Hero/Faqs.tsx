"use client"
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { FaQ } from "react-icons/fa6";

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
        question: "How do I create or join a team?",
        answer: "You can easily create a team by setting up your profile and specifying your preferred tech stack. To join a team, browse through available teams looking for members with your skills."
        },
        {
        question: "Is the platform free to use?",
        answer: "Yes, the platform is completely free and open-source for developers to connect, form teams, and find hackathons."
        },
        {
        question: "Can I join more than one team?",
        answer: "Yes, you can join multiple teams based on the hackathons you're interested in and your availability."
        },
        {
        question: "How does the skill-matching algorithm work?",
        answer: "Our platform matches you with teams and developers based on your skills, experience, and hackathon preferences."
        },
        {
        question: "How do I find hackathons to participate in?",
        answer: "Explore the “Explore Hackathons” section, where you can find upcoming and active hackathons to participate in which are listed on various hackathon listing platforms."
        },
        {
        question: "Is there a verification process for skills?",
        answer: "While we don't require formal verification, you can showcase your experience through your profile, including past projects, certifications, and linked GitHub repositories."
        },
        {
        question: "What types of hackathons are featured?",
        answer: "We feature a wide range of hackathons, from beginner-friendly events to expert-level competitions, across various tech stacks and domains."
        }
    ]

    const toggleFAQ = (index:any ) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className=" w-full sm:w-[80%] flex items-center justify-center p-4 my-[10rem] ">
        <div className="w-full  space-y-4">
            <h2 className=" text-xl sm:text-2xl font-bold text-text text-center md:text-left mb-8 flex justify-start items-center gap-4 divide-x"><FaQ />Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
            <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openIndex === index}
                toggleFAQ={() => toggleFAQ(index)}
            />
            ))}
        </div>
        </div>
    )
    }

    function FAQItem({ question, answer, isOpen, toggleFAQ }: { question: string, answer: string, isOpen: boolean, toggleFAQ: () => void }) {
    return (
        <div className="bg-transparent backdrop-blur-md rounded-lg overflow-hidden">
        <button
            className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none border-b border-blue-700/50 dark:border-blue-500/50"
            onClick={toggleFAQ}
            aria-expanded={isOpen}
        >
            <span className="text-lg font-medium text-text">{question}</span>
            <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            >
            <ChevronDown className="w-5 h-5 text-accent" />
            </motion.div>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
            <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
                <div className="px-6 pb-4">
                <p className="text-text mt-4 ">{answer}</p>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    )
}