
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
  Activity,
  BarChart3,
  ClipboardCheck,
  BookHeart,
} from "lucide-react"

export default function AdminDashboardPage() {
  const firstName = "Admin";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {firstName}!</h1>
        <p className="text-muted-foreground">Platform administration overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Total Users</CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,254</p>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Active Users</CardTitle>
                <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">893</p>
             <p className="text-xs text-muted-foreground">54% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Total Providers</CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">86</p>
             <p className="text-xs text-muted-foreground">+12 since last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <ClipboardCheck className="h-8 w-8 text-primary" />
              <CardTitle>Assessments Taken</CardTitle>
            </div>
            <CardDescription>
              Total number of wellness assessments completed by users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,450</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <BookHeart className="h-8 w-8 text-primary" />
              <CardTitle>Journal Entries</CardTitle>
            </div>
            <CardDescription>
              Total number of journal entries created by users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,123</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
