'use client';

import {Button} from "@/components/ui/button";
import {Star} from "lucide-react";
import {enrollInCourse} from "@/actions/course/enroll";
import {useTransition} from "react";
import {toast} from "sonner";

interface EnrollButtonProps {
    courseId: string;
}

export default function EnrollButton({courseId}: EnrollButtonProps) {
    const [isPending, startTransition] = useTransition()

    const handleEnroll = async () => {
        startTransition(async () => {
            try {
                const response = await enrollInCourse(courseId);
                console.log(response)
                toast.success("Enrollment successful!")
            } catch (error) {
                alert((error as Error).message);
            }
        });
    };

    return (
        <Button
            size="lg"
            className="w-full"
            onClick={handleEnroll}
            disabled={isPending}
        >
            <Star className="w-4 h-4 mr-2"/>
            {isPending ? 'Enrolling...' : 'Enroll Now'}
        </Button>
    );
}
