import { signUpEndpoint } from "@/utils/endpoints";
import {SignupFormValues} from "@/zod/auth-schema";

interface SuccessResponse {
    statusCode: number;
    message: string;
    success: true;
    data?: any;
}

interface ErrorResponse {
    statusCode: number;
    message: string;
    success: false;
    errors?: Array<{
        field?: string;
        message: string;
    }>;
}

type Response = SuccessResponse | ErrorResponse;

export async function signUp(data: SignupFormValues): Promise<Response> {
    try {
        const response = await fetch(signUpEndpoint, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const responseData = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    if (responseData.error?.details?.errors) {
                        const validationErrors = responseData.error.details.errors.map((err: any) => ({
                            field: err.path?.[0] || err.name,
                            message: err.message
                        }));

                        return {
                            statusCode: 400,
                            message: "Validation failed",
                            success: false,
                            errors: validationErrors
                        };
                    }

                    if (responseData.error?.message?.includes('Email or Username are already taken')) {
                        return {
                            statusCode: 400,
                            message: "An account with this email already exists",
                            success: false
                        };
                    }

                    return {
                        statusCode: 400,
                        message: responseData.error?.message || "Invalid data provided",
                        success: false
                    };

                case 429:
                    return {
                        statusCode: 429,
                        message: "Too many requests. Please try again later.",
                        success: false
                    };

                case 500:
                    return {
                        statusCode: 500,
                        message: "Server error. Please try again later.",
                        success: false
                    };

                default:
                    return {
                        statusCode: response.status,
                        message: responseData.error?.message || "Something went wrong. Please try again.",
                        success: false
                    };
            }
        }

        return {
            statusCode: 200,
            message: "Account created successfully!",
            success: true,
            data: responseData.user || responseData
        };

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return {
                statusCode: 0,
                message: "Network error. Please check your connection and try again.",
                success: false
            };
        }

        return {
            statusCode: 500,
            message: "An unexpected error occurred. Please try again later.",
            success: false
        };
    }
}




