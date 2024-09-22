import Image from 'next/image'
import CTASection from '@/app/assets/CTASection.svg'
import CTASectionLight from '@/app/assets/CTASectionLight.svg'
import logo from '@/app/assets/logo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const FootCTA = () => {
    return (
        <section className='w-full p-6 grid place-items-center '>
            <div className=' relative w-full p-10 rounded-lg border border-dotted border-text flex items-center justify-center  '>
                <Image src={CTASection} alt="bg-gradient-dark" className="-z-10 w-full h-full object-cover absolute top-0 left-0 inset-0 overflow-hidden invisible dark:visible "/>
                <Image src={CTASectionLight} alt="bg-gradient-light" className="-z-10 w-full h-full object-cover absolute top-0 left-0 inset-0 overflow-hidden dark:invisible "/>
                <div className=' flex flex-col gap-8 items-center justify-between py-5 lg:py-12 text-text '>
                    <Image src={logo} alt="logo" className="w-20 h-20" />
                    <h2 className=' text-3xl sm:text-6xl font-bold text-wrap text-center flex justify-start items-center gap-4 divide-x'>Build Innovative Products <br/> w{"/"} Innovative People</h2>
                    <p className=' text-base tracking-tight text-balance text-center '>Join the community of skilled  developers and innovators to <br/> collaborate, learn, and build winning hackathon teams.</p>
                    <Link href={'/signup'}>
                        <Button variant={'link'} className=" group dark:hover:shadow-[0_4px_14px_0_rgba(20,_243,_232,_0.2)] hover:shadow-[0_6px_20px_rgba(20,_79,_243,_0.5)] px-8 py-6 rounded-md text-white dark:text-slate-900 font-semibold text-lg transition duration-200 ease-linear bg-[rgb(20,175,255)] bg-gradient-to-br dark:from-[rgba(20,175,255,1)] dark:to-rgba(39,116,254,1) from-[rgba(0,198,255,1)] to-[rgba(0,91,255,1)] flex justify-center items-center gap-1 active:outline  active:outline-offset-2 active:outline-2 active:outline-white">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FootCTA
