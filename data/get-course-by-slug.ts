import {getCurrentUser} from "@/data/user/get-current-user";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {Course} from "@/types/course";
import {getAuthCookie} from "@/utils/getAuthCookie";
import {baseUrl} from "@/utils/endpoints";

export async function getCourseBySlug(slug: string): Promise<Course | null> {
    const user = await getCurrentUser();
    const token = await getAuthCookie()

    if (!user) {
        const headersList = await headers();
        const pathname = headersList.get("x-pathname") || `/courses/${slug}`;
        redirect(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }

    try {

        const result = await fetch(`${baseUrl}/courses/${slug}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const response = await result.json()

        return response.data


    } catch (error) {
        console.log(error);
        return null;
    }
}