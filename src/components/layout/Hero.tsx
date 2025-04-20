'use client';

import Image from 'next/image';

const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Consolidate Your Social Links
                <br />
                Effortlessly
            </h1>
            <p className="text-gray-600 max-w-xl mb-6">
                With our app, you can easily save and manage all your social links in one convenient location.
                <br />
                Track your online activity and share your profiles seamlessly across platforms.
            </p>
            <div className="flex gap-4 mb-10">
                <button className="px-6 py-2 bg-foreground text-background rounded hover:opacity-90 transition">
                    Get Started
                </button>
                <button className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">
                    Learn More
                </button>
            </div>
            <div className="w-full max-w-5xl aspect-video bg-gray-300 flex items-center justify-center rounded">
                <Image
                    src="/images/hero.png"
                    alt="App Preview"
                    width={1200}
                    height={675}
                    className="object-contain"
                />
            </div>
        </section>
    );
};

export default Hero;
