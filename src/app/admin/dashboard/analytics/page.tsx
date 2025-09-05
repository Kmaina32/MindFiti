
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <CardDescription>
          Key metrics and insights into platform usage.
        </Description>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Analytics dashboards and reports will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
