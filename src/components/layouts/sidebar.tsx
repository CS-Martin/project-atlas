"use client"

import * as React from "react"
import {
    IconChartBar,
    IconDashboard,
    IconFolder,
    IconInnerShadowTop,
    IconListDetails,
    IconUsers,
} from "@tabler/icons-react"
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
import { useAuth, useUser } from "@clerk/nextjs"
import { NavUser } from "./nav-user"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: IconDashboard,
        },
        {
            title: "Lifecycle",
            url: "#",
            icon: IconListDetails,
        },
        {
            title: "Analytics",
            url: "#",
            icon: IconChartBar,
        },
        {
            title: "Projects",
            url: "#",
            icon: IconFolder,
        },
        {
            title: "Team",
            url: "#",
            icon: IconUsers,
        },
    ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useQuery(api.users.api.getCurrentAuthenticatedUser)

    if (!user) {
        return null
    }

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </a>
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
