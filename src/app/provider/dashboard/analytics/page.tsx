"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProviderAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Analytics</CardTitle>
        <CardDescription>
          Key metrics and insights into your practice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Analytics dashboards for your practice will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
