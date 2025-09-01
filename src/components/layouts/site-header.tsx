"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import gsap from "gsap"

export function SiteHeader() {
    const { theme, setTheme } = useTheme()
    const iconRef = useRef<HTMLSpanElement | null>(null)

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light"

        // Animate icon with gsap
        if (iconRef.current) {
            gsap.fromTo(
                iconRef.current,
                { rotate: 0, scale: 1 },
                {
                    rotate: 180,
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setTheme(nextTheme)
                        // reset animation for new icon
                        gsap.fromTo(
                            iconRef.current,
                            { rotate: -180, scale: 0 },
                            { rotate: 0, scale: 1, duration: 0.3, ease: "power2.inOut" }
                        )
                    },
                }
            )
        } else {
            setTheme(nextTheme)
        }
    }

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">Dashboard</h1>
                <div className="ml-auto flex items-center gap-2">
                    {/* Theme Toggle Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="hidden sm:flex relative"
                    >
                        <span ref={iconRef} className="flex items-center">
                            {theme === "light" ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
