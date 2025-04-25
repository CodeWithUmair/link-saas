import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Unlock Your Link Management</h2>
        </div>

        <div className="max-w-md">
          <p className="text-muted-foreground mb-6">
            Join us today and streamline your online presence. With our app, you can effortlessly save and manage all
            your social links in one convenient place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-foreground text-white hover:bg-gray-800">
              <Link href="#">Sign Up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
