'use client';

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { navLinks } from "@/const"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button";

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <header className="lg:hidden flex justify-between items-center h-16 w-full p-5 bg-white border-b-4 border-purple-100">
            <Link href="/">
                <Image src="/assets/images/logo-text.svg" alt="logo" height={28} width={280} className="cursor-pointer"/>
            </Link>

            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">로그인</Link>
                    </Button>
                </SignedOut>
                <Sheet>
                    <SheetTrigger asChild>
                        <Image src="/assets/icons/menu.svg" alt="logo" height={32} width={32}/>
                    </SheetTrigger>
                    <SheetContent className="sm:w-64">
                        <>
                            <Image src="/assets/images/logo-text.svg" alt="logo" width={152} height={23}/>
                            <ul className="flex w-full flex-col items-start mt-8">
                                <SignedIn>
                                    {navLinks.map((link)=> {
                                        const isActive = link.route === pathname;
                                        
                                        return (
                                            <li key={link.route} className={cn(
                                                "whitespace-nowrap text-dark-700 p-18 flex",
                                                isActive && "gradient-text"
                                            )}>
                                                <Link className="p-4 flex gap-4 h-full w-full cursor-pointer" href={link.route}>
                                                    <Image src={link.icon} alt="logo" width={24} height={24}/>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </SignedIn> 
                            </ul>
                        </>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    )
}

export default MobileNav