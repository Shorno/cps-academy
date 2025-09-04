import qs from "qs"
import {client} from "@/lib/strapi";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import {getAuthCookie} from "@/utils/getAuthCookie";


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
    fee : number;
    durationWeeks: number;
    totalClasses: number;
    totalContests: number;
    totalProblems: number;
    requirements?: BlocksContent | null;
    audience?: BlocksContent | null;
    modules: Module[];
    thumbnail?: Thumbnail | null;
    highlights?: string[]
    registrationStartDate : string
    registrationEndDate: string,
    classStartDate: string
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
    const token = await getAuthCookie();

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
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });

    return result.json();
}