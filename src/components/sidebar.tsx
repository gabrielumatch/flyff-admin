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
import { ChevronDown } from "lucide-react"

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
    icon: Languages,
    items: [
      {
        title: "Item Names",
        href: "/dashboard/translations/items",
      },
      {
        title: "NPC Dialogues",
        href: "/dashboard/translations/npcs",
      },
      {
        title: "UI Elements",
        href: "/dashboard/translations/ui",
      },
      {
        title: "Quest Text",
        href: "/dashboard/translations/quests",
      },
      {
        title: "System Messages",
        href: "/dashboard/translations/messages",
      },
    ],
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
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isExpanded = (title: string) => expandedItems.includes(title)

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
          {sidebarNavItems.map((item) => {
            const hasSubItems = 'items' in item
            const isActive = hasSubItems 
              ? item.items?.some(subItem => pathname === subItem.href)
              : pathname === item.href

            return (
              <div key={item.title}>
                {hasSubItems ? (
                  <>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-between gap-2",
                        collapsed && "justify-center px-2"
                      )}
                      onClick={() => toggleExpanded(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && item.title}
                      </div>
                      {!collapsed && (
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded(item.title) && "rotate-180"
                        )} />
                      )}
                    </Button>
                    {!collapsed && isExpanded(item.title) && item.items && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.items.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href}>
                            <Button
                              variant={pathname === subItem.href ? "secondary" : "ghost"}
                              className="w-full justify-start gap-2 text-sm"
                              size="sm"
                            >
                              {subItem.title}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href!}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && item.title}
                    </Button>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
