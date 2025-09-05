
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RewardsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
        <CardDescription>
          Earn rewards for engaging with your wellness journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Information about the rewards program will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
