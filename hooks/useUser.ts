import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "@/data/user/get-current-user";
import {User} from "@/actions/auth/login";

export default function useUser() {
    return useQuery<User | undefined | null>({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser
    })
}