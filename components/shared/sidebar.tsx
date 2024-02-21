'use client';

import { navLinks } from "@/const"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-72 bg-white shado shadow-purple-200/20 lg:flex">
        <div className="h-full w-full flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image src='/assets/images/logo-text.svg' alt="로고" width={180} height={28}/>
            </Link>
            <nav className="h-full flex-col justify-between md:flex md:gap-4 px-2">
                <SignedIn>
                    <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                        {navLinks.slice(0,6).map((link)=> {
                            const isActive = link.route === pathname;
                            
                            return (
                                <li key={link.route} className={cn(
                                    "group whitespace-nowrap flex w-full rounded-full transition-all hover:bg-purple-100 hover:shadow-inner items-center justify-center",
                                    isActive ? 'bg-purple-gradient text-white':'text-gray-700'
                                )}>
                                    <Link className="p-4 flex gap-4 h-full w-full" href={link.route}>
                                        <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && 'brightness-200'}`}/>
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>    
                    <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                        {navLinks.slice(6).map((link)=> {
                            const isActive = link.route === pathname;
                            
                            return (
                                <li key={link.route} className={cn(
                                    "group whitespace-nowrap flex w-full rounded-full transition-all hover:bg-purple-100 hover:shadow-inner items-center justify-center",
                                    isActive ? 'bg-purple-gradient text-white':'text-gray-700'
                                )}>
                                    <Link className="p-4 flex gap-4 h-full w-full" href={link.route}>
                                        <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && 'brightness-200'}`}/>
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                        
                        <li className="p-4 flex items-center justify-center cursor-pointer gap-2">
                            <UserButton afterSignOutUrl="/" showName/>
                        </li>                        
                    </ul>    
                </SignedIn>    

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">로그인</Link>
                    </Button>
                </SignedOut>
            </nav>    
        </div>        
    </aside>
  )
}

export default Sidebar