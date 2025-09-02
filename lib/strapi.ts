import {strapi} from "@strapi/client"

export const client = strapi({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337/api",
    auth: process.env.NEXT_PUBLIC_STRAPI_READ_ONLY_API_TOKEN
})