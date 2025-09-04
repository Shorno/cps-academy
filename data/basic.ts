import qs from "qs"
import {Course} from "@/types/course";
import {baseUrl} from "@/utils/endpoints";

interface CourseResponse {
    data: Course[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

export async function getCourses(): Promise<CourseResponse> {
    const query = qs.stringify({
        populate: {
            thumbnail: true,
            modules: true
        }
    }, {
        encodeValuesOnly: true,
    });


    const result = await fetch(`${baseUrl}/courses?${query}`, {
        method: "GET",
    })

    return result.json();
}