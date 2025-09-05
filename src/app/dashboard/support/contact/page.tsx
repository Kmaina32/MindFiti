
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactUsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Get in touch with our support team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Contact form and information will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
