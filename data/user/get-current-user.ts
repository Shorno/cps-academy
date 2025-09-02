"use server";

import {getAuthCookie} from "@/utils/getAuthCookie";
import {User} from "@/actions/auth/login";
import {meEndpoint} from "@/utils/endpoints";

export async function getCurrentUser(): Promise<User | null> {
    try {
        const token = await getAuthCookie();

        if (!token) return null;

        const response = await fetch(meEndpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch current user. Status: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        return null;
    }
}
