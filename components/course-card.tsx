import {BookOpen, Users, Code, ArrowRight} from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {Course} from "@/data/basic";
import Link from "next/link";

interface CourseCardProps {
    course: Course
    className?: string
}

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export function CourseCard({ course, className = '' }: CourseCardProps) {

    return (
        <Card className={`overflow-hidden pt-0  hover:shadow-lg transition-all duration-300 cursor-pointer group ${className}`}>
            <div className="aspect-video bg-muted overflow-hidden relative">
                {course.thumbnail ? (
                    <Image
                        width={500}
                        height={300}
                        src={strapiBaseUrl + course.thumbnail.url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <div className="text-center">
                            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm font-medium">Course Preview</p>
                        </div>
                    </div>
                )}

                <Badge variant="secondary" className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
                    {course.durationWeeks} weeks
                </Badge>
            </div>

            <CardHeader className="pb-3">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {course.title}
                </h3>

                <div className="text-sm text-muted-foreground line-clamp-4"><BlocksRenderer content={course.overview}/></div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <h4 className="text-sm font-medium mb-3">Course Modules</h4>
                    <div className="space-y-2">
                        {course.modules.map((module) => (
                            <div key={module.id} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground leading-relaxed">{module.title}</span>
                            </div>
                        ))}
                        {course.modules.length > 5 && (
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground/70 leading-relaxed">
                  +{course.modules.length - 5} more modules
                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-2">
                    <div className="text-center space-y-1">
                        <div className="flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-lg font-semibold">{course.totalClasses}</div>
                        <div className="text-xs text-muted-foreground">Classes</div>
                    </div>

                    <div className="text-center space-y-1">
                        <div className="flex items-center justify-center">
                            <Users className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-lg font-semibold">{course.modules.length}</div>
                        <div className="text-xs text-muted-foreground">Modules</div>
                    </div>

                    <div className="text-center space-y-1">
                        <div className="flex items-center justify-center">
                            <Code className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-lg font-semibold">{course.totalProblems}</div>
                        <div className="text-xs text-muted-foreground">Problems</div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-4 border-t">
                <Button size="lg" className={"w-full"} asChild>
                    <Link href={`/courses/${course.slug}`} className="flex justify-center items-center gap-2">
                        View details <ArrowRight/>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
