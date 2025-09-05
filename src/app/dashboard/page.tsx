"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  BookHeart,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartData: any[] = [
  // { date: "2023-01", mood: 3 },
  // { date: "2023-02", mood: 4 },
  // { date: "2023-03", mood: 3 },
  // { date: "2023-04", mood: 5 },
  // { date: "2023-05", mood: 4 },
  // { date: "2023-06", mood: 5 },
]

const chartConfig = {
  mood: {
    label: "Mood",
    color: "hsl(var(--primary))",
  },
}


export default function DashboardPage() {
  const firstName = "there";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground">Here's a look at your wellness journey. Ready to continue?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <CardTitle>Your Mood Trend</CardTitle>
            </div>
            <CardDescription>
              A visualization of your mood scores from recent journal entries.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {chartData.length > 0 ? (
               <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: -20,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mood"
                    type="natural"
                    fill="var(--color-mood)"
                    fillOpacity={0.4}
                    stroke="var(--color-mood)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground">No mood data yet. Start journaling to see your trend.</p>
              </div>
            )}
          </CardContent>
        </Card>
         <div className="space-y-6">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <ClipboardCheck className="h-8 w-8 text-primary" />
                  <CardTitle>Start an Assessment</CardTitle>
                </div>
                <CardDescription>
                  Understand your current state of mind.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild>
                  <Link href="/dashboard/assessment">
                    Take an Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
             <Card className="flex flex-col h-full">
                <CardHeader>
                    <div className="flex items-center gap-4">
                    <BookHeart className="h-8 w-8 text-primary" />
                    <CardTitle>Write in Your Journal</CardTitle>
                    </div>
                    <CardDescription>
                    Clear your mind and express your feelings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                    <Button asChild>
                    <Link href="/dashboard/journal">
                        Create a New Entry <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </CardContent>
             </Card>
         </div>
      </div>
    </div>
  )
}
