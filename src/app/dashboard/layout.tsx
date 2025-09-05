
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
  Video,
  BrainCircuit,
  LifeBuoy,
  ChevronDown,
  Globe,
  Handshake,
  Landmark,
  Award,
  CreditCard,
  Phone,
  User,
} from "lucide-react"

import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from "@/components/logo"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { useAuth } from "@/context/auth-context"
import { useEffect } from "react"
import { BrandedLoader } from "@/components/branded-loader"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading || !userProfile) {
    return <BrandedLoader />;
  }


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
          <SidebarContent className="flex-1">
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
                <Link href="/dashboard/telehealth" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/telehealth")}
                    tooltip={{
                        children: "Telehealth",
                    }}
                    >
                    <Video />
                    <span>Telehealth</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/insights" passHref>
                    <SidebarMenuButton
                    isActive={isActive("/dashboard/insights")}
                    tooltip={{
                        children: "Insights",
                    }}
                    >
                    <BrainCircuit />
                    <span>Behavioral Insights</span>
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

               <Collapsible asChild>
                 <div>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={{
                          children: "Support",
                        }}
                        className="group-data-[collapsible=icon]:justify-center"
                      >
                        <LifeBuoy />
                        <span className="flex-1">Support</span>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  <CollapsibleContent asChild>
                    <SidebarMenu className="pl-6">
                       <SidebarMenuItem>
                          <Link href="/dashboard/support/local-support" passHref>
                              <SidebarMenuButton isActive={isActive("/dashboard/support/local-support")} variant="ghost" className="h-8">
                                <Globe/>
                                <span>Local Support</span>
                              </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <Link href="/dashboard/support/follow-up-care" passHref>
                              <SidebarMenuButton isActive={isActive("/dashboard/support/follow-up-care")} variant="ghost" className="h-8">
                                <Handshake/>
                                <span>Follow-up Care</span>
                              </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <Link href="/dashboard/support/cultural-resources" passHref>
                              <SidebarMenuButton isActive={isActive("/dashboard/support/cultural-resources")} variant="ghost" className="h-8">
                                <Landmark/>
                                <span>Cultural Resources</span>
                              </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <Link href="/dashboard/support/rewards" passHref>
                              <SidebarMenuButton isActive={isActive("/dashboard/support/rewards")} variant="ghost" className="h-8">
                                <Award/>
                                <span>Rewards</span>
                              </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                          <Link href="/dashboard/support/payments" passHref>
                              <SidebarMenuButton isActive={isActive("/dashboard/support/payments")} variant="ghost" className="h-8">
                                <CreditCard/>
                                <span>Payments</span>
                              </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <Link href="/dashboard/support/contact" passHref>
                              <SidebarMenuButton isActive={isActive("/dashboard/support/contact")} variant="ghost" className="h-8">
                                <Phone/>
                                <span>Contact Us</span>
                              </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                 </div>
              </Collapsible>
            </SidebarMenu>
          </SidebarContent>
          <SidebarContent className="mt-auto flex-none">
             <SidebarMenu>
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
                    <Link href="/dashboard/profile" passHref>
                        <SidebarMenuButton
                        isActive={isActive("/dashboard/profile")}
                        tooltip={{
                            children: "Profile",
                        }}
                        >
                        <User />
                        <span>Profile</span>
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
          <SidebarTrigger />
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
