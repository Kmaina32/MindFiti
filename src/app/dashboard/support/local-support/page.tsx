
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, MapPin, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const localResources: any[] = [
]

export default function LocalSupportPage() {
    const [resources, setResources] = useState(localResources);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Find Local Support</h1>
        <p className="text-muted-foreground">Connect with mental health resources and professionals in your community.</p>
      </div>

       <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by city, county, or service (e.g., 'Nairobi', 'Counseling')" className="pl-10 text-base py-6 rounded-lg" />
        </div>
      
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            {resources.length > 0 ? resources.map(resource => (
                <Card key={resource.name}>
                    <CardHeader>
                        <CardTitle>{resource.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{resource.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{resource.phone}</span>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Services:</h4>
                            <div className="flex flex-wrap gap-2">
                                {resource.services.map((service: string) => (
                                    <span key={service} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{service}</span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        No local resources found. Please try a different search.
                    </CardContent>
                </Card>
            )}
        </div>
        <div className="lg:col-span-1">
            <Card className="overflow-hidden">
                 <Image src="https://picsum.photos/600/400" alt="Map of local resources" width={600} height={400} className="w-full object-cover" data-ai-hint="map kenya"/>
                 <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Map view of support centers near you. Interactive map coming soon.</p>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
