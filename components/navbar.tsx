"use client"

import {Button} from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import {useState} from "react"
import {usePathname} from "next/navigation";
import {ModeToggle} from "@/components/mode-toggle";
import {UserProfile} from "@/components/UserProfile";

const navigationLinks = [
    {href: "/courses", label: "Courses"},
    {href: "/about", label: "About"},
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()



    return (
        <header className="border-b px-4 md:px-6">
            <div className="container mx-auto flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile drawer */}
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className={"h-1/3"}>
                            <div className="mx-auto w-full max-w-sm p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-foreground">Menu</h3>
                                    <ModeToggle/>
                                </div>
                                <nav className="flex flex-col space-y-4">
                                    {navigationLinks.map((link, index) => (
                                        <DrawerClose key={index} asChild>
                                            <Link
                                                href={link.href}
                                                className={`text-left py-2 px-4 rounded-md transition-colors ${
                                                    pathname === link.href
                                                        ? "bg-primary text-primary-foreground"
                                                        : "hover:bg-accent hover:text-accent-foreground"
                                                }`}
                                                onClick={() => setOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        </DrawerClose>
                                    ))}
                                </nav>
                            </div>
                        </DrawerContent>


                    </Drawer>

                    {/* Main nav */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-primary hover:text-primary/90">
                            <h1 className="md:text-xl font-bold text-foreground cursor-pointer">
                                CPS Academy
                            </h1>
                        </Link>
                        {/* Desktop navigation menu */}
                        <NavigationMenu className="max-md:hidden">
                            <NavigationMenuList className="gap-2">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink asChild active={pathname === link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-muted-foreground hover:text-primary py-1.5 font-medium px-3 rounded-md transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <div className={"hidden md:block"}>
                        <ModeToggle/>
                    </div>
                   <UserProfile/>
                </div>
            </div>
        </header>
    )
}
