import LogoutButton from "@/components/buttons/LogoutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { NAVIGATION } from "@/constants/nav";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-background border-b py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-primary">
            <span className="font-bold">um-saas</span>
          </Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            {NAVIGATION.mainNav.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Right Side */}
        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {session ? (
            <>
              {NAVIGATION.authNav.authenticated.map((item, index) =>
                item.component === "LogoutButton" ? (
                  <LogoutButton key={index} />
                ) : (
                  <Link key={item.href} href={item.href || "/"}>
                    {item.prefix}
                    {session?.user?.name}
                  </Link>
                )
              )}
            </>
          ) : (
            NAVIGATION.authNav.unauthenticated.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))
          )}
        </nav>
      </div>
    </header>
  );
}
