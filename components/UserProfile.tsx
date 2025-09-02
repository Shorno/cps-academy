"use client"

import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import useUser from "@/hooks/useUser"
import {useQueryClient} from "@tanstack/react-query"
import {signOut} from "@/actions/auth/sign-out"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

export function UserProfile() {
    const {data: user, isLoading} = useUser()
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOut()

            queryClient.invalidateQueries({queryKey: ["currentUser"]})

            toast.success("Signed out successfully")
            router.push("/")
        } catch (error) {
            console.error("Sign out error:", error)
            toast.error("Failed to sign out")
        }
    }

    if (isLoading) {
        return <div className="w-8 h-8 bg-muted rounded-full animate-pulse"/>
    }

    if (!user) {
        return (
            <>
                <Button asChild variant="ghost" size="sm" className="text-sm">
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="text-sm">
                    <Link href="/sign-up">Get Started</Link>
                </Button>
            </>
        )
    }

    const initial = user.username
        ? user.username.charAt(0).toUpperCase()
        : user.email.charAt(0).toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.username || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
