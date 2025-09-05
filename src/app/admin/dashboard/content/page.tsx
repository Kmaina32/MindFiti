"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminContentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>
          Manage educational resources and community guidelines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content management tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
