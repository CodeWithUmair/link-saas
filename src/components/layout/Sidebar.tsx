"use client";

import { ExternalLink, Home, Inbox } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

type AppSidebarProps = {
    page?: {
        uri: string;
    };
    session?: Session;
};

export function AppSidebar({ page, session }: AppSidebarProps) {
    const [hostName, setHostName] = useState("");

    // Utility to normalize host name (remove "www.")
    const normalizeHostName = (host: string): string => {
        return host.replace(/^www\./, "");
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hostname = normalizeHostName(window.location.hostname);
            setHostName(hostname);
        }
    }, []);

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
        },
    ];

    return (
        <Sidebar>
            <SidebarContent className="rounded-xl">
                <SidebarMenu className="p-4 py-6">
                    <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto bg-foreground">
                        <Image
                            src={session?.user?.image || "/default.png"}
                            width={256}
                            height={256}
                            alt="avatar"
                        />
                    </div>

                    {page && (
                        <Link
                            target="_blank"
                            href={`/${page.uri}`}
                            className="text-center mt-4 flex gap-1 group items-center rounded-full p-1 bg-background justify-center text-xl text-gray-500"
                        >
                            <span>{hostName}</span>
                            <span>/</span>
                            <span>{page.uri}</span>
                            <ExternalLink size={16} className="ml-2 group-hover:scale-125 transition-all ease-in-out duration-300" />
                        </Link>
                    )}

                    <div className="my-3" />

                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className="px-2">
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                    <Link
                        href="/"
                        className="flex px-4 items-center gap-2 text-xs text-gray-500 border-t pt-4"
                    >
                        <span>Back to website</span>
                    </Link>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
