import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-xl italic mb-6 inline-block">
              Logo
            </Link>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for the latest updates on features and releases.
              </p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email here" className="max-w-xs" />
                <Button>Join</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you consent to our Privacy Policy and receive updates.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm flex items-center gap-2 hover:underline">
                  <Facebook className="w-4 h-4" /> Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center gap-2 hover:underline">
                  <Instagram className="w-4 h-4" /> Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center gap-2 hover:underline">
                  <Twitter className="w-4 h-4" /> Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center gap-2 hover:underline">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center gap-2 hover:underline">
                  <Youtube className="w-4 h-4" /> YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Relume. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
