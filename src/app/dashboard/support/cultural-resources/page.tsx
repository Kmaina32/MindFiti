
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, Mic, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const resources: any[] = [
    // {
    //     title: "Understanding Mental Health in an African Context",
    //     type: "Article",
    //     category: "Cultural Perspectives",
    //     image: "https://picsum.photos/400/260",
    //     dataAiHint: "African community"
    // },
    // {
    //     title: "Podcast: The Role of Community in Wellness",
    //     type: "Podcast",
    //     category: "Community & Support",
    //     image: "https://picsum.photos/400/261",
    //     dataAiHint: "podcast microphone"
    // },
    // {
    //     title: "Traditional Healing and Modern Psychology",
    //     type: "Article",
    //     category: "Integrative Approaches",
    //     image: "https://picsum.photos/400/262",
    //     dataAiHint: "traditional healing"
    // },
    // {
    //     title: "Finding a Culturally Competent Therapist",
    //     type: "Guide",
    //     category: "Finding Support",
    //     image: "https://picsum.photos/400/263",
    //     dataAiHint: "therapist session"
    // }
]

export default function CulturalResourcesPage() {
  const [culturalResources, setCulturalResources] = useState(resources);

  return (
    <div className="space-y-8">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Landmark className="h-10 w-10 text-primary"/>
                <div>
                    <CardTitle className="text-2xl">Culturally-Sensitive Resources</CardTitle>
                    <CardDescription>
                        We believe in care that respects and understands your cultural background. These resources are curated to be relevant and sensitive to experiences within the African context.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      
      {culturalResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalResources.map(resource => (
              <Link href="#" key={resource.title}>
                  <Card className="overflow-hidden h-full group">
                      <div className="relative">
                          <Image 
                              src={resource.image}
                              alt={resource.title}
                              width={400}
                              height={250}
                              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                              data-ai-hint={resource.dataAiHint}
                          />
                          <div className={`absolute top-2 right-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-white ${resource.type === 'Podcast' ? 'bg-primary' : 'bg-accent'}`}>
                              {resource.type === 'Podcast' ? <Mic className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                              <span>{resource.type}</span>
                          </div>
                      </div>
                      <CardHeader>
                          <CardTitle className="text-lg leading-tight group-hover:text-primary">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-muted-foreground">{resource.category}</p>
                      </CardContent>
                  </Card>
              </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No cultural resources are available at this time.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
