import Link from "next/link"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 mb-12">
          <p className="text-sm font-medium">Connect</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground">We&apos;re here to help you with any questions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Email</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
            <Link href="mailto:hello@relume.io" className="text-sm font-medium hover:underline">
              hello@relume.io
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Live chat</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
            <Link href="#" className="text-sm font-medium hover:underline">
              Start new chat
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Phone</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
            <Link href="tel:+1(555)123-4567" className="text-sm font-medium hover:underline">
              +1 (555) 123-4567
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Office</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
            <p className="text-sm font-medium">456 Example Ave, New York, NY 10001</p>
          </div>
        </div>
      </div>
    </div>
  )
}
