import { Home, Inbox } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

export function AppSidebar({ page, session }) {
    console.log("🚀 ~ AppSidebar ~ page:", page)

    // Menu items.
    const items = [
        {
            title: "Account",
            url: "/dashboard/account",
            icon: Home,
        },
        {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: Inbox,
        }
    ]

    return (
        <Sidebar>
            <SidebarContent className="rounded-xl">
                <SidebarMenu className="p-4 py-6">
                    <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
                        <Image src={session?.user?.image} width={256} height={256} alt={'avatar'} />
                    </div>
                    {page && (
                        <Link
                            target="_blank"
                            href={'/' + page.uri}
                            className="text-center mt-4 flex gap-1 items-center justify-center">
                            <span className="text-xl text-gray-300">/</span>
                            <span>{page.uri}</span>
                        </Link>
                    )}

                    <div className="my-5" />

                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <Link href={'/'} className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4">
                        <span>Back to website</span>
                    </Link>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
