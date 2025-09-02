import {Button} from "@/components/ui/button"
import {ArrowRight, Code, Trophy, Users} from "lucide-react"
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-32">
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl text-balance leading-tight sm:leading-tight">
                        Master Competitive Programming and Land Your Dream Job
                    </h1>
                    <p className="mt-4 text-base leading-7 text-muted-foreground text-pretty sm:text-lg sm:leading-8 sm:mt-6 px-4 sm:px-0">
                        Join thousands of programmers who have transformed their careers with our expert-designed
                        courses. From
                        competitive programming to system design, we'll prepare you for success at top tech companies.
                    </p>

                    <div
                        className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
                        <Button asChild size="lg" className="text-base sm:text-lg px-6 py-3 sm:px-8 w-full sm:w-auto">
                            <Link href={"/sign-up"}>
                                Start Learning Today
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5"/>
                            </Link>
                        </Button>
                        <Button asChild
                                size="lg"
                                variant="outline"
                                className="text-base sm:text-lg px-6 py-3 sm:px-8 w-full sm:w-auto"
                        >
                            <Link href={"/courses"}>
                                View Courses
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 px-4 sm:px-0">
                        <div className="flex flex-col items-center py-4 sm:py-0">
                            <div
                                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary"/>
                            </div>
                            <div className="mt-3 sm:mt-4 text-center">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">5,000+</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Students Enrolled</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center py-4 sm:py-0">
                            <div
                                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary"/>
                            </div>
                            <div className="mt-3 sm:mt-4 text-center">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">95%</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Job Success Rate</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center py-4 sm:py-0">
                            <div
                                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-primary"/>
                            </div>
                            <div className="mt-3 sm:mt-4 text-center">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">1,000+</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Practice Problems</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
