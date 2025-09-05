"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LearnPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Center</CardTitle>
        <CardDescription>
          Browse articles, videos, and resources to support your wellness journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Educational content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
