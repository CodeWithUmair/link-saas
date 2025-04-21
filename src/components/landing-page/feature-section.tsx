import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturesSection() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <p className="text-sm font-medium">Links</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Easily Save and Share Your Social Links</h2>
                <p className="text-muted-foreground">
                    Our app simplifies link management by allowing you to save all your social media links in one convenient
                    place. Track your activity and share your links effortlessly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <Package className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold">How to Save Your Links</h3>
                    <p className="text-sm text-muted-foreground">Start by creating an account to get started.</p>
                </div>

                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <Package className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold">Sharing Your Links Made Easy</h3>
                    <p className="text-sm text-muted-foreground">Share your unique link across all platforms.</p>
                </div>

                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <Package className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold">Track Your Activity Seamlessly</h3>
                    <p className="text-sm text-muted-foreground">Monitor clicks and engagement in real-time.</p>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-16">
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
