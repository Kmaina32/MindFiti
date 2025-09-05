
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  Users,
  Calendar,
  Activity,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function ProviderDashboardPage() {
  const firstName = "Provider";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {firstName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your practice.</p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Total Clients</CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Active Clients</CardTitle>
                <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">9</p>
             <p className="text-xs text-muted-foreground">75% of total clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Upcoming Sessions</CardTitle>
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">4</p>
             <p className="text-xs text-muted-foreground">In the next 7 days</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Monthly Revenue</CardTitle>
                <DollarSign className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$4,520</p>
             <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle>Manage Clients</CardTitle>
            </div>
            <CardDescription>
              View your client list, check their progress, and manage their care plans.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/provider/dashboard/clients">
                View Clients <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-primary" />
              <CardTitle>Manage Appointments</CardTitle>
            </div>
            <CardDescription>
              Schedule new appointments, view your upcoming sessions, and manage your availability.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/provider/dashboard/appointments">
                View Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
