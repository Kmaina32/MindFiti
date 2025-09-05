
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
        <CardDescription>
          Manage platform-wide settings and configurations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Admin settings will be configured here.</p>
      </CardContent>
    </Card>
  );
}
