"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Image from "next/image"
import { useTheme } from "next-themes"
import { FolderKanban, LayoutDashboard } from "lucide-react"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            title: "Transactions",
            url: "/transaction",
            icon: <FolderKanban className="h-5 w-5" />,
        },
    ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { theme } = useTheme()
    const user = useQuery(api.users.api.getCurrentAuthenticatedUser)

    if (!user) {
        return null
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            {theme === "dark" ? (
                                <Image src={'/sophons-logo-light.png'} alt="Sophons logo" height={500} width={500} className="!h-12 !w-auto" />
                            ) : (
                                <Image src={'/sophons-logo-dark.png'} alt="Sophons logo" height={500} width={500} className="!h-12 !w-auto" />
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
