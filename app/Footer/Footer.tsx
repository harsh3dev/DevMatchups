/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RQeiiXwC8Br
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Subscribe to our newsletter</h3>
          <p className="text-gray-200">Get the latest updates and offers delivered directly to your inbox.</p>
          <form className="flex space-x-2 justify-center items-center ">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 rounded-lg "
            />
            <Button
              type="submit"
              className="bg-white text-blue-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 rounded-lg "
            >
              Subscribe
            </Button>
          </form>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Company</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link href="#" className="hover:text-white" prefetch={false}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white" prefetch={false}>
                Our Team
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white" prefetch={false}>
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white" prefetch={false}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Contact</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <div className="flex items-center space-x-2">
                {/* <MapPinIcon className="h-5 w-5" /> */} (add logo)
                <span>123 Main St, Anytown USA</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-2">
                {/* <PhoneIcon className="h-5 w-5" /> */} (add logo)
                <span>(123) 456-7890</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-2">
                {/* <MailIcon className="h-5 w-5" /> */} (add logo)
                <span>info@company.com</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-8 flex justify-between items-center text-gray-300">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-white" prefetch={false}>
            {/* <FacebookIcon className="h-5 w-5" /> */} (add logo)
          </Link>
          <Link href="#" className="hover:text-white" prefetch={false}>
            {/* <TwitterIcon className="h-5 w-5" /> */} (add logo)
          </Link>
          <Link href="#" className="hover:text-white" prefetch={false}>
            {/* <InstagramIcon className="h-5 w-5" /> */} (add logo)
          </Link>
          <Link href="#" className="hover:text-white" prefetch={false}>
            {/* <LinkedinIcon className="h-5 w-5" /> */} (add logo)
          </Link>
        </div>
      </div>
    </footer>
  )
}
