
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FollowUpCarePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-up Care</CardTitle>
        <CardDescription>
          Information and resources for continuing your care.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Follow-up care plans and resources will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
