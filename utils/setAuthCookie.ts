"use server"
import {cookies} from "next/headers";

export async function setAuthCookie (token : string) : Promise<void>{
    const cookieStore = await cookies();

    cookieStore.set({
        name: 'jwt',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge : 60 * 60 * 24 * 7,
    })

}