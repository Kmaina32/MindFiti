
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Phone, Shield, HeartHandshake } from "lucide-react";

export default function CrisisSupportPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Crisis Support & Resources</CardTitle>
        <CardDescription>
          If you are in a crisis or believe you may be in danger, please use these resources to get immediate help.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-start gap-4">
          <Phone className="h-8 w-8 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold">National Suicide Prevention Lifeline</h3>
            <p className="text-muted-foreground">Call 988</p>
            <p className="text-sm text-muted-foreground">Available 24/7. Languages: English, Spanish.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <LifeBuoy className="h-8 w-8 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold">Crisis Text Line</h3>
            <p className="text-muted-foreground">Text HOME to 741741</p>
            <p className="text-sm text-muted-foreground">Free, 24/7 crisis support via text message.</p>
          </div>
        </div>
         <div className="flex items-start gap-4">
          <Phone className="h-8 w-8 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold">The Trevor Project (LGBTQ Youth)</h3>
            <p className="text-muted-foreground">Call 1-866-488-7386 or Text START to 678-678</p>
            <p className="text-sm text-muted-foreground">Specialized support for LGBTQ youth in crisis.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Shield className="h-8 w-8 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold">National Domestic Violence Hotline</h3>
            <p className="text-muted-foreground">Call 1-800-799-7233</p>
            <p className="text-sm text-muted-foreground">Support for individuals experiencing domestic violence.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <HeartHandshake className="h-8 w-8 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold">Befrienders Kenya</h3>
            <p className="text-muted-foreground">Call +254 736 548880</p>
            <p className="text-sm text-muted-foreground">Emotional support to prevent suicide in Kenya.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <HeartHandshake className="h-8 w-8 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold">Kenya Red Cross Society</h3>
            <p className="text-muted-foreground">Call 1199</p>
            <p className="text-sm text-muted-foreground">Provides counseling and emergency response services.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
