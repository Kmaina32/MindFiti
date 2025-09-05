
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>
          Manage your billing and payment information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Payment history and methods will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
