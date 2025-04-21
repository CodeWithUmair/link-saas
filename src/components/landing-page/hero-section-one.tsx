import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSectionOne() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Connect</p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            Your Social Links, All in One Place
                        </h1>
                        <p className="text-muted-foreground mt-4 max-w-lg">
                            Our app simplifies your online presence by consolidating all your social links into one easy-to-use
                            interface. Track your activity and stay organized effortlessly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <Package className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold">Easy Access</h3>
                            <p className="text-sm text-muted-foreground">Save and manage all your social links effortlessly.</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <Package className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold">Stay Organized</h3>
                            <p className="text-sm text-muted-foreground">
                                Keep track of your online activity in one convenient location.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="outline" asChild>
                            <Link href="#">Learn More</Link>
                        </Button>
                        <Button asChild>
                            <Link href="#">
                                Sign Up <span className="ml-2">→</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image
                            src="/placeholder.svg?height=400&width=400"
                            alt="App preview"
                            width={400}
                            height={400}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
