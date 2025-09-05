
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Gift } from "lucide-react";

const rewards = [
    {
        title: "1-Month Free Premium",
        cost: 5000,
    },
    {
        title: "30-Minute Coaching Session",
        cost: 3500,
    },
    {
        title: "MindFiti Branded Journal",
        cost: 2000,
    }
]

export default function RewardsPage() {
  const userPoints = 1250;
  const pointsToNextTier = 2000;
  const progress = (userPoints / pointsToNextTier) * 100;

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Your Rewards</h1>
            <p className="text-muted-foreground">Earn points for completing activities and redeem them for exciting rewards.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Your Points</CardTitle>
                    <Award className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{userPoints.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Points earned this month</p>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Next Tier: Wellness Champion</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="mb-2 h-3" />
                    <p className="text-sm text-muted-foreground text-center">
                        You are <span className="font-bold text-primary">{pointsToNextTier - userPoints}</span> points away from the next tier!
                    </p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Redeem Rewards</CardTitle>
                <CardDescription>Use your points to claim these exclusive rewards.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map(reward => (
                    <Card key={reward.title} className="flex flex-col">
                        <CardHeader className="flex-grow">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <Gift className="h-10 w-10 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-center text-xl">{reward.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-2xl font-bold text-primary mb-4">{reward.cost.toLocaleString()} pts</p>
                            <Button className="w-full" disabled={userPoints < reward.cost}>
                                {userPoints >= reward.cost ? "Redeem" : "Not enough points"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
