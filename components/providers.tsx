'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import type * as React from 'react'
import { getQueryClient } from "@/utils/get-query-client"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Toaster richColors position={"top-right"} />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}
