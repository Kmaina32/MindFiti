

"use client"

import {
  BookHeart,
  Home,
  ClipboardCheck,
  Settings,
  ShieldAlert,
  Search,
  Users2,
  BookOpen,
} from "lucide-react"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/user-menu"
import { cn } from "@/lib/utils"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider>
      <Sidebar>
        <div className="flex h-full flex-col">
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2" >
              <Logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">MindFiti</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <Link href="/dashboard" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard")}
                    tooltip={{
                        children: "Dashboard",
                    }}
                    >
                    <Home />
                    <span>Dashboard</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/assessment" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/assessment")}
                    tooltip={{
                        children: "Assessments",
                    }}
                    >
                    <ClipboardCheck />
                    <span>Assessments</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/journal" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/journal")}
                    tooltip={{
                        children: "Journal",
                    }}
                    >
                    <BookHeart />
                    <span>Journal</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/dashboard/community" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/community")}
                    tooltip={{
                        children: "Community",
                    }}
                    >
                    <Users2 />
                    <span>Community</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/dashboard/learn" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/learn")}
                    tooltip={{
                        children: "Learn",
                    }}
                    >
                    <BookOpen />
                    <span>Learn</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/crisis-support" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/crisis-support")}
                    tooltip={{
                        children: "Crisis Support",
                    }}
                    >
                    <ShieldAlert />
                    <span>Crisis Support</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/settings" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/settings")}
                    tooltip={{
                        children: "Settings",
                    }}
                    >
                    <Settings />
                    <span>Settings</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </div>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <form>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search for anything..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                </div>
            </form>
          </div>
          <UserMenu />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
