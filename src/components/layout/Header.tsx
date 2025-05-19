import { getServerSession } from "next-auth"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LogoutButton from "@/components/buttons/LogoutButton"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { NAVIGATION } from "@/constants/nav"

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-background border-b py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center gap-6">
            <Link href={NAVIGATION.brand.href} className="font-bold text-xl italic text-primary">
              {NAVIGATION.brand.label}
            </Link>

          </div>
          <nav className="hidden md:flex items-center justify-center gap-6">
            {NAVIGATION.mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900">
                Resources <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/blog" className="w-full">
                    Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/guides" className="w-full">
                    Guides
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/help" className="w-full">
                    Help Center
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side - Auth nav */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4 text-sm text-slate-500">
              {session ? (
                <>
                  {NAVIGATION.authNav.authenticated.map((item, index) =>
                    item.component === "LogoutButton" ? (
                      <LogoutButton key={index} />
                    ) : (
                      <Link key={item.href} href={item.href || "/"} className="hover:text-slate-900">
                        {item.prefix}
                        {session?.user?.name}
                      </Link>
                    ),
                  )}
                </>
              ) : (
                NAVIGATION.authNav.unauthenticated.map((item) =>
                  item.label === "Sign In" ? (
                    <Button key={item.href} asChild className="bg-foreground text-background hover:bg-gray-800">
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ) : (
                    <Link key={item.href} href={item.href} className="hover:text-slate-900">
                      {item.label}
                    </Link>
                  ),
                )
              )}
            </nav>

            <Button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
