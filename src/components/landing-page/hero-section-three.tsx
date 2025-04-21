import Image from "next/image"
import { Package } from "lucide-react"

export default function HeroSectionThree() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        Unlock Your Online Potential with Our All-in-One Link Management App
                    </h1>
                    <p className="text-muted-foreground max-w-lg">
                        Enhance your online presence by consolidating all your social links in one place. Share effortlessly and gain valuable insights into your audience&apos;s engagement.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <Package className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold">Link Management</h3>
                            <p className="text-sm text-muted-foreground">
                                Easily manage and share your social links with just a few clicks.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <Package className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold">Actionable Insights</h3>
                            <p className="text-sm text-muted-foreground">
                                Track user activity and engagement to optimize your online strategy.
                            </p>
                        </div>
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
