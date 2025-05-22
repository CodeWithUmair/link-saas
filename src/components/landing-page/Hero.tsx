import HeroForm from "@/components/forms/hero-form";
import { getServerSession, Session } from "next-auth";

import Image from 'next/image';
import Container from "@/components/layout/container";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Hero = async () => {
    const session = (await getServerSession(authOptions)) as Session | null;

    return (
        <section className="w-full px-4 py-20 min-h-[92dvh] flex flex-col xl:flex-row items-center justify-center text-center bg-background">
            <Container className="flex flex-col xl:flex-row items-center justify-between gap-4">
                <div className="w-full text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                        Consolidate Your Social Links <br className="hidden sm:inline" />
                        Effortlessly
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-2xl">
                        With our app, you can easily save and manage all your social links in one convenient location.
                        Track your online activity and share your profiles seamlessly across platforms.
                    </p>

                    <HeroForm user={session} />
                </div>

                <div className="w-full max-w-4xl aspect-auto bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <Image
                        src="/images/hero.png"
                        alt="App Preview"
                        width={1200}
                        height={675}
                        className="object-cover w-full h-full rounded-lg"
                    />
                </div>
            </Container>
        </section>
    );
};

export default Hero;
