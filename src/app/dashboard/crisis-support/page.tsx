"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Phone } from "lucide-react";

export default function CrisisSupportPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Crisis Support</CardTitle>
        <CardDescription>
          If you are in a crisis or any other person may be in danger, don't use this site. These resources can provide you with immediate help.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center gap-4">
          <Phone className="h-8 w-8 text-destructive" />
          <div>
            <h3 className="font-semibold">National Suicide Prevention Lifeline</h3>
            <p className="text-muted-foreground">Call 988</p>
            <p className="text-sm text-muted-foreground">Available 24 hours. Languages: English, Spanish.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LifeBuoy className="h-8 w-8 text-destructive" />
          <div>
            <h3 className="font-semibold">Crisis Text Line</h3>
            <p className="text-muted-foreground">Text HOME to 741741</p>
            <p className="text-sm text-muted-foreground">Free, 24/7 crisis support via text message.</p>
          </div>
        </div>
         <div className="flex items-center gap-4">
          <Phone className="h-8 w-8 text-destructive" />
          <div>
            <h3 className="font-semibold">The Trevor Project</h3>
            <p className="text-muted-foreground">Call 1-866-488-7386 or Text START to 678-678</p>
            <p className="text-sm text-muted-foreground">For LGBTQ youth in crisis.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
