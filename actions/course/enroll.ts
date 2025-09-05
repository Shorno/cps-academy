"use server"
import {getAuthCookie} from '@/utils/getAuthCookie';
import {baseUrl} from "@/utils/endpoints";

export async function enrollInCourse(courseId: string) {
    const token = await getAuthCookie();

    const response = await fetch(`${baseUrl}/enroll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({courseId}),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Failed to enroll');
    }

    return response .json();
}
