import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSectionTwo() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-2">
                    <p className="text-sm font-medium">Connect</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        Discover the Power of Link Aggregation
                    </h1>
                </div>

                <div className="text-muted-foreground">
                    <p>
                        Our app simplifies your online presence by consolidating all your social links in one accessible location.
                        Enjoy seamless sharing across platforms and keep track of your interactions effortlessly. Stay organized and
                        enhance your digital footprint with our user-friendly interface.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="flex flex-col gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold">Effortless Link Sharing Made Simple</h3>
                    <p className="text-sm text-muted-foreground">Share your links with just a click.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold">Track Your Activity with Ease</h3>
                    <p className="text-sm text-muted-foreground">Monitor your engagement and optimize your content.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold">Stay Organized and In Control</h3>
                    <p className="text-sm text-muted-foreground">Keep all your links in one convenient place.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-12">
                <Button asChild>
                    <Link href="#">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="#">
                        Learn More <span className="ml-2">→</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
