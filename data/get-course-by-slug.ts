import {Course} from "@/data/basic";
import {client} from "@/lib/strapi";
import {getCurrentUser} from "@/data/user/get-current-user";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import qs from "qs";

export async function getCourseBySlug(slug: string): Promise<Course | null> {
    const user = await getCurrentUser();

    if (!user) {
        const headersList = await headers();
        const pathname = headersList.get("x-pathname") || `/courses/${slug}`;
        redirect(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }

    try {

        const query = qs.stringify({
            populate: {
                thumbnail: true,
                modules: {
                    populate: ['topics']
                }
            }
        }, {
            encodeValuesOnly: true,
        });


        const result = await client.fetch(`courses?${query}`, {
            method: "GET",
        });

        const response = await result.json();

        if (response.data && response.data.length > 0) {
            return response.data[0];
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}