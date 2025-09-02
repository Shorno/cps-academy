import {client} from "@/lib/strapi";

interface Course {
    id: number
    documentId: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

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
    const result = await client.fetch("courses", {method: "GET"});
    return result.json()
}