import {HeroSection} from "@/components/landing/hero-section";
import {getCurrentUser} from "@/data/user/get-current-user";

export default async function Home() {
    const user = await getCurrentUser();

    console.log(user)
    return (
        <div className={""}>
            <HeroSection/>
        </div>
    );
}


