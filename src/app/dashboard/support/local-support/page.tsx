
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LocalSupportPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Support</CardTitle>
        <CardDescription>
          Find support groups and resources in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Localized support information will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
