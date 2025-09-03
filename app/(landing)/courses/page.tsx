import {getCourses} from "@/data/basic"
import {CourseCard} from "@/components/course-card";

export default async function CoursesPage() {
    const courses = await getCourses()
    console.log(courses)
    if (!courses.data || courses.data.length === 0) {
        return <div className="text-center text-gray-500">No courses available.</div>
    }
    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.data.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
