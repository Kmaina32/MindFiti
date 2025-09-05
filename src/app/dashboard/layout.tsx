"use client"

import {
  BookHeart,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Settings,
  ShieldAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
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
  useSidebar,
} from "@/components/ui/sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await auth.signOut()
    router.push("/")
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <div className="flex h-full flex-col">
          <SidebarHeader>
            <div className="flex items-center gap-2" >
              <Logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">MindFiti</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard"
                  tooltip={{
                    children: "Dashboard",
                  }}
                >
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/assessment"
                  tooltip={{
                    children: "Assessments",
                  }}
                >
                  <BookHeart />
                  <span>Assessments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/journal"
                  tooltip={{
                    children: "Journal",
                  }}
                >
                  <BookHeart />
                  <span>Journal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/crisis-support"
                  tooltip={{
                    children: "Crisis Support",
                  }}
                >
                  <ShieldAlert />
                  <span>Crisis Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/settings"
                  tooltip={{
                    children: "Settings",
                  }}
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-2">
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
              <PanelLeft className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
            </Button>
          </div>
        </div>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2 ml-auto">
            {user?.email}
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </SidebarProvider>
  )
}
