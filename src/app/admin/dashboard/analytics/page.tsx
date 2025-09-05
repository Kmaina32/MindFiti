"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "January", users: 186, providers: 5 },
  { month: "February", users: 305, providers: 8 },
  { month: "March", users: 237, providers: 12 },
  { month: "April", users: 473, providers: 15 },
  { month: "May", users: 209, providers: 18 },
  { month: "June", users: 214, providers: 20 },
]


const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--primary))",
  },
  providers: {
    label: "Providers",
    color: "hsl(var(--accent))",
  },
}

export default function AdminAnalyticsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly new user and provider sign-ups.</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                <Bar dataKey="providers" fill="var(--color-providers)" radius={4} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-72 w-full items-center justify-center">
              <p className="text-muted-foreground">No data to display.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature Engagement</CardTitle>
          <CardDescription>Usage metrics for key platform features.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">More detailed engagement analytics coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
