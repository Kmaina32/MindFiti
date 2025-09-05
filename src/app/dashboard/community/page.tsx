"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Hub</CardTitle>
        <CardDescription>
          Connect with others, share your journey, and find support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Community forums and group discussions will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
