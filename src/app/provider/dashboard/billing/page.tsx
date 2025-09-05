"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProviderBillingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Payments</CardTitle>
        <CardDescription>
          Manage your invoices, payments, and subscription.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Billing and payment management tools will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
