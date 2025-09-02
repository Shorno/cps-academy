import {loginEndpoint} from "@/utils/endpoints";
import {LoginFormValues} from "@/zod/auth-schema";

interface SuccessResponse {
    statusCode: number;
    message: string;
    success: true;
    data: {
        jwt: string;
        user: any;
    };
}

interface ErrorResponse {
    statusCode: number;
    message: string;
    success: false;
}

type Response = SuccessResponse | ErrorResponse;

export async function login(data: LoginFormValues): Promise<Response> {
    try {
        const response = await fetch(loginEndpoint, {
            body: JSON.stringify({
                identifier: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData.error?.message ||
                responseData.message ||
                "Login failed. Please try again.";

            return {
                statusCode: response.status,
                message: errorMessage,
                success: false
            };
        }

        return {
            statusCode: 200,
            message: "Login successful!",
            success: true,
            data: {
                jwt: responseData.jwt,
                user: responseData.user
            }
        };

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return {
                statusCode: 0,
                message: "Network error. Please check your connection.",
                success: false
            };
        }
        return {
            statusCode: 500,
            message: "An unexpected error occurred. Please try again.",
            success: false
        };
    }
}