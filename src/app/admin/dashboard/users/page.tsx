"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage all users on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">User management interface will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
