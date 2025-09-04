import {getCourseBySlug} from "@/data/get-course-by-slug";
import {BookOpen, Calendar, CheckCircle,Code, Star, Target, Trophy, Users} from "lucide-react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import dayjs from "dayjs";

const baseUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:1337"
        : "";

export default async function CourseDetailsPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    const courseDetails = await getCourseBySlug(slug);

    console.log(courseDetails)

    if (!courseDetails) {
        return <>Course not found</>
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="relative">
                <div className="aspect-[21/9] md:aspect-[3/1] bg-muted overflow-hidden">
                    {courseDetails.thumbnail ? (
                        <Image
                            width={1920}
                            height={640}
                            src={`${baseUrl}${courseDetails.thumbnail.url}`}
                            alt={courseDetails.title}
                            className="w-full h-full object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <BookOpen className="w-24 h-24 text-muted-foreground" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
                                {courseDetails.title}
                            </h1>

                            <div className="text-lg text-muted-foreground">
                                <BlocksRenderer content={courseDetails.overview} />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{courseDetails.totalClasses}+</div>
                                    <div className="text-sm text-muted-foreground">Live Classes</div>
                                </div>

                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{courseDetails.totalContests}+</div>
                                    <div className="text-sm text-muted-foreground">Contests</div>
                                </div>

                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <Code className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{courseDetails.totalProblems}+</div>
                                    <div className="text-sm text-muted-foreground">Problems</div>
                                </div>

                                <div className="text-center p-4 bg-muted/50 rounded-lg">
                                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold">{courseDetails.modules?.length || 0}</div>
                                    <div className="text-sm text-muted-foreground">Modules</div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">📚 Course Modules</h2>
                            <div className="space-y-4">
                                {courseDetails.modules?.map((module, index) => (
                                    <Card key={module.id} className="overflow-hidden shadow-xs">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg leading-tight">{module.title}</h3>
                                                    <div className="text-sm text-muted-foreground mt-2">
                                                        <BlocksRenderer content={module.description} />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        {module.topics?.length > 0 && (
                                            <CardContent className="pt-0">
                                                <div className="space-y-2">
                                                    <h4 className="text-sm font-medium text-muted-foreground">Topics Covered:</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {module.topics.map((topic) => (
                                                            <div key={topic.id} className="flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                <span className="text-sm">{topic.title}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <Card className="overflow-hidden  shadow-sm">
                                <CardHeader className="text-center space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-3xl font-bold">{courseDetails.fee} BDT</div>
                                        <div className="text-sm text-muted-foreground">Complete Course Fee</div>
                                    </div>

                                    <Button size="lg" className="w-full">
                                        <Star className="w-4 h-4 mr-2" />
                                        Enroll Now
                                    </Button>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <Separator />

                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Important Dates
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Admission Period:</span>
                                                <span className="font-medium">{dayjs(courseDetails.registrationStartDate).format("MMM DD")} - {dayjs(courseDetails.registrationEndDate).format("MMM DD")}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Classes Start:</span>
                                                <span className="font-medium">{dayjs(courseDetails.classStartDate).format("MMM DD YYYY")}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Target className="w-4 h-4" />
                                            Course Highlights
                                        </h3>
                                        <div className="space-y-2">
                                            {courseDetails.highlights?.map((highlight) => (
                                                <div key={highlight} className="flex items-center gap-2">
                                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                                        Download Syllabus
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
