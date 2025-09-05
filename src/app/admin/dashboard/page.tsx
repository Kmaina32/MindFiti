
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
  BarChart3,
} from "lucide-react"

export default function AdminDashboardPage() {
  const firstName = "Admin";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {firstName}!</h1>
        <p className="text-muted-foreground">Platform administration overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>
              View, edit, and manage all users on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for user stats */}
            <p>Total Users: 0</p>
            <p>Clients: 0</p>
            <p>Providers: 0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <CardTitle>Platform Analytics</CardTitle>
            </div>
            <CardDescription>
              Key metrics and insights into platform usage.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for analytics */}
             <p>Assessments Taken: 0</p>
             <p>Journal Entries: 0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
