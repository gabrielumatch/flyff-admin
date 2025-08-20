'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Package, 
  Languages, 
  Users, 
  Settings, 
  BarChart3, 
  FileText,
  ChevronLeft,
  Menu
} from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Items",
    href: "/dashboard/items",
    icon: Package,
  },
  {
    title: "Translations",
    href: "/dashboard/translations",
    icon: Languages,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Game Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "System Logs",
    href: "/dashboard/logs",
    icon: FileText,
  },
]

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col border-r bg-background", collapsed ? "w-16" : "w-64", className)}>
      <div className="flex h-14 items-center justify-between border-b px-3">
        <div className={cn(
          "flex items-center gap-2 transition-all",
          collapsed ? "justify-center w-full" : "justify-start"
        )}>
          {!collapsed && (
            <span className="font-semibold">Flyff Admin</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {sidebarNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && item.title}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
