"use server"
import {cookies} from "next/headers"

export async function signOut(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete('jwt')
}
