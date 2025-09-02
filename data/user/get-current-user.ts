"use server"

import {getAuthCookie} from "@/utils/getAuthCookie";
import {User} from "@/actions/auth/login";

export async function getCurrentUser() : Promise<User> {
    const token = await getAuthCookie();

    const response = await fetch('http://localhost:1337/api/users/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}