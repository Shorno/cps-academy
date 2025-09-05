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

    const result = await fetch(`${baseUrl}/courses`, {
        method: "GET",
    })

    return result.json();
}