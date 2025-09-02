export const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337/api"

export const loginEndpoint = `${baseUrl}/auth/local`
export const signUpEndpoint = `${baseUrl}/auth/local/register`
export const meEndpoint = `${baseUrl}/users/me`