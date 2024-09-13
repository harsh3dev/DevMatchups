"use client"
import { useState, useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

import { FaQ } from "react-icons/fa6";
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
        question: "What types of hackathons are featured?",
        answer: "We feature a wide range of hackathons, from beginner-friendly events to expert-level competitions, across various tech stacks and domains."
        }
    ]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const [isHeaderSticky, setIsHeaderSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const { top } = headerRef.current.getBoundingClientRect()
                setIsHeaderSticky(top <= 0)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="min-h-screen bg-background text-text p-6 w-full relative md:grid md:grid-cols-[repeat(20,_1fr)] md:items-start md:justify-between ">
            <div
                ref={headerRef}
                className={` bg-background z-10 transition-all duration-300 top-0 md:top-20 md:col-start-1 xl:col-start-2 md:col-end-[8] xl:col-end-[8] md:row-start-1 md:row-end-2 md:self-start lg:sticky ${isHeaderSticky ? 'py-4' : 'py-12'
                    }`}
            >
                <h1 className=" mb-4 max-w-[1056px] text-lg font-semibold  md:text-6xl min-w-max  dark:text-white ">
                    Frequently <br/> Asked Questions
                </h1>
            </div>
            
            <div className="mt-12  w-full space-y-4 md:col-start-[10] md:col-end-[20] md:row-start-1 md:row-end-2 md:max-w-[811px] ">
            <div aria-hidden="true" className="mb-2 flex w-full items-center justify-end"><p className="bg-black dark:bg-white h-[18px] md:h-6 w-[74px] md:w-[86px] text-center text-[14px] md:text-base font-semibold uppercase font-mono leading-[18px] md:leading-[24px] tracking-[0.06em] text-white dark:text-black border-b border-dotted border-gray-800 dark:border-gray-200 ">F.A.Q</p></div>
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-dotted border-gray-800 dark:border-gray-200">
                        <button
                            className="w-full text-left py-4 flex justify-start gap-4 items-center focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <ArrowRight 
                                className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'transform rotate-90' : ''
                                    }`}
                            />
                            <span className="text-xl font-semibold">{faq.question}</span>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <p className="py-4 text-gray-800 dark:text-gray-200 ">{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}


// export default function Faqs() {
//     const [openIndex, setOpenIndex] = useState(null);

//     const faqs = [
//         {
//         question: "How do I create or join a team?",
//         answer: "You can easily create a team by setting up your profile and specifying your preferred tech stack. To join a team, browse through available teams looking for members with your skills."
//         },
//         {
//         question: "Is the platform free to use?",
//         answer: "Yes, the platform is completely free and open-source for developers to connect, form teams, and find hackathons."
//         },
//         {
//         question: "Can I join more than one team?",
//         answer: "Yes, you can join multiple teams based on the hackathons you're interested in and your availability."
//         },
//         {
//         question: "How does the skill-matching algorithm work?",
//         answer: "Our platform matches you with teams and developers based on your skills, experience, and hackathon preferences."
//         },
//         {
//         question: "How do I find hackathons to participate in?",
//         answer: "Explore the “Explore Hackathons” section, where you can find upcoming and active hackathons to participate in which are listed on various hackathon listing platforms."
//         },
//         {
//         question: "What types of hackathons are featured?",
//         answer: "We feature a wide range of hackathons, from beginner-friendly events to expert-level competitions, across various tech stacks and domains."
//         }
//     ]

//     const toggleFAQ = (index:any ) => {
//         setOpenIndex(openIndex === index ? null : index)
//     }

//     return (
//         <div className=" w-full sm:w-[80%] flex items-center justify-center p-4 my-10 ">
//         <div className="w-full  space-y-4">
//             <h2 className=" text-xl sm:text-2xl font-bold text-text text-center md:text-left mb-8 flex justify-start items-center gap-4 divide-x"><FaQ />FAQs</h2>
//             {faqs.map((faq, index) => (
//             <FAQItem 
//                 key={index} 
//                 question={faq.question} 
//                 answer={faq.answer} 
//                 isOpen={openIndex === index}
//                 toggleFAQ={() => toggleFAQ(index)}
//             />
//             ))}
//         </div>
//         </div>
//     )
//     }

//     function FAQItem({ question, answer, isOpen, toggleFAQ }: { question: string, answer: string, isOpen: boolean, toggleFAQ: () => void }) {

//     return (
//         <div className="bg-transparent backdrop-blur-md rounded-lg overflow-hidden">
//         <button
//             className="w-full px-6 py-4 text-left transition-all ease-linear flex justify-between items-center focus:outline-none border-b border-blue-700/50 dark:border-blue-500/50"
//             onClick={toggleFAQ}
//             aria-expanded={isOpen}
//         >
//             <span className="text-lg font-medium text-text">{question}</span>
//             <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//             >
//             <ChevronDown className="w-5 h-5 text-accent" />
//             </motion.div>
//         </button>
//         <AnimatePresence initial={false}>
//             {isOpen && (
//             <motion.div
//                 initial="collapsed"
//                 animate="open"
//                 exit="collapsed"
//                 variants={{
//                 open: { opacity: 1, height: "auto" },
//                 collapsed: { opacity: 0, height: 0 }
//                 }}
//                 transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
//             >
//                 <div className="px-6 pb-4">
//                 <p className="text-text mt-4 ">{answer}</p>
//                 </div>
//             </motion.div>
//             )}
//         </AnimatePresence>
//         </div>
//     )
// }