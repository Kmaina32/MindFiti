
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, BrainCircuit, Mic, Palette } from "lucide-react";
import { useState } from "react";

const insightPatterns: any[] = [
  // {
  //   title: "Improved Sleep Pattern",
  //   value: "+15%",
  //   description: "Your sleep quality has improved by 15% over the past week.",
  //   variant: "success"
  // },
  // {
  //   title: "Active Day Correlation",
  //   value: "+23%",
  //   description: "Days with more activity correlate with better mood scores.",
  //   variant: "success"
  // },
  // {
  //   title: "Evening Mood Dips",
  //   value: "-8%",
  //   description: "Your mood typically decreases between 6-8 PM.",
  //   variant: "warning"
  // },
];

export default function BehavioralInsightsPage() {
  const [patterns, setPatterns] = useState(insightPatterns);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Behavioral Insights Preview</h1>
        <p className="text-muted-foreground">See how AI-powered analysis, micro meditation, and mood-based color therapy work.</p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-4xl">🧠</div>
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">This is a preview with sample data.</h3>
                <p className="text-muted-foreground">Sign in to get personalized behavioral insights based on your own data!</p>
            </div>
            <Button size="lg">
                Sign In to Get Personal Insights
            </Button>
          </CardContent>
      </Card>

      <Tabs defaultValue="ai-insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-insights" className="gap-2"><BrainCircuit /> AI Insights</TabsTrigger>
          <TabsTrigger value="micro-meditation" className="gap-2"><Mic /> Micro Meditation</TabsTrigger>
          <TabsTrigger value="color-therapy" className="gap-2"><Palette /> Color Therapy</TabsTrigger>
        </TabsList>
        <TabsContent value="ai-insights" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI-Driven Pattern Analysis</CardTitle>
                    <CardDescription>Our AI analyzes your journal entries, mood scores, and activity to find meaningful patterns in your behavior.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <h3 className="text-lg font-semibold text-center">Your Recent Patterns</h3>
                    {patterns.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {patterns.map((pattern) => (
                          <Card key={pattern.title} className="flex flex-col">
                              <CardHeader className="flex-row items-center justify-between pb-2">
                                  <CardTitle className="text-base font-medium">{pattern.title}</CardTitle>
                                  <Badge variant={pattern.variant === "success" ? "default" : "destructive"}>
                                      DEMO
                                  </Badge>
                              </CardHeader>
                              <CardContent className="flex-grow space-y-2">
                                  <div className="text-4xl font-bold">{pattern.value}</div>
                                  <p className="text-xs text-muted-foreground">
                                      {pattern.description}
                                  </p>
                              </CardContent>
                          </Card>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-12">
                        No patterns detected yet. Start journaling to see your insights.
                      </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="micro-meditation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Micro Meditations</CardTitle>
              <CardDescription>Based on your current mood and recent journal entries, our AI generates short, personalized guided meditations to help you find balance in minutes.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
                 <Mic className="mx-auto h-12 w-12 text-primary" />
                 <p className="mt-4 text-muted-foreground">The Micro Meditation feature is coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="color-therapy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mood-Based Color Therapy</CardTitle>
              <CardDescription>Your application theme subtly shifts based on your tracked mood, creating a therapeutic visual environment. This is a passive feature that works in the background.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
                <Palette className="mx-auto h-12 w-12 text-primary" />
                <p className="mt-4 text-muted-foreground">The Color Therapy feature is coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
