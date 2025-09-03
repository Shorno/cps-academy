import {getCourseBySlug} from "@/data/get-course-by-slug";

export default async function CourseDetailsPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    const courseDetails = await getCourseBySlug(slug);
    console.log(courseDetails)

    if (!courseDetails) {
        return <>Course not found</>
    }

    return (
        <>
            {slug}
        </>
    )
}