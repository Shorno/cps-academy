import {client} from "@/lib/strapi";
import {BlocksContent} from "@strapi/blocks-react-renderer";


interface Thumbnail {
    id: number;
    url: string;
    width: number;
    height: number;
}

interface Topic {
    id: number;
    documentId: string;
    title: string;
    content: BlocksContent | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    order: number;
}

interface Module {
    id: number;
    documentId: string;
    title: string;
    description: BlocksContent;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    topics: Topic[];
}

export interface Course {
    id: number;
    documentId: string;
    title: string;
    description: BlocksContent;
    overview: BlocksContent;
    slug: string;
    durationWeeks: number;
    totalClasses: number;
    totalContests: number;
    totalProblems: number;
    requirements?: BlocksContent | null;
    audience?: BlocksContent | null;
    modules: Module[];
    thumbnail?: Thumbnail | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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
    const result = await client.fetch("courses?populate=*", {
            method: "GET"
        }
    );
    return result.json()
}