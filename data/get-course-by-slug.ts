import {Course} from "@/data/basic";
import {client} from "@/lib/strapi";
import {getCurrentUser} from "@/data/user/get-current-user";
import {redirect} from "next/navigation";
import {headers} from "next/headers";

export async function getCourseBySlug(slug: string): Promise<Course | null> {
    const user = await getCurrentUser();

    if (!user) {
        const headersList = await headers();
        const pathname = headersList.get("x-pathname") || `/courses/${slug}`;
        redirect(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }

    try {

        const result = await client.fetch(`courses?filters[slug][$eq]=${slug}&populate=*`, {
            method: "GET",
        });

        return await result.json()
    } catch (error) {
        console.log(error)
        return null
    }

}