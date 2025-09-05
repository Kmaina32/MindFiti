
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Video, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const learningCategories = [
    { name: "Understanding Anxiety", icon: <BookOpen /> },
    { name: "Coping Mechanisms", icon: <BookOpen /> },
    { name: "Mindfulness Practices", icon: <Video /> },
    { name: "Addiction & Recovery", icon: <BookOpen /> },
    { name: "Building Healthy Habits", icon: <Video /> },
]

const learningContent: any[] = [
    // {
    //     title: "What is Anxiety and How Does it Affect Us?",
    //     type: "Article",
    //     category: "Understanding Anxiety",
    //     image: "https://picsum.photos/400/250",
    //     dataAiHint: "brain neurons"
    // },
    //  {
    //     title: "Guided Meditation for Stress Relief",
    //     type: "Video",
    //     category: "Mindfulness Practices",
    //     image: "https://picsum.photos/400/251",
    //     dataAiHint: "calm meditation"
    // },
    // {
    //     title: "The 5-4-3-2-1 Grounding Technique",
    //     type: "Article",
    //     category: "Coping Mechanisms",
    //     image: "https://picsum.photos/400/252",
    //     dataAiHint: "nature walk"
    // },
    // {
    //     title: "The Science of Habit Formation",
    //     type: "Video",
    //     category: "Building Healthy Habits",
    //     image: "https://picsum.photos/400/253",
    //     dataAiHint: "person running"
    // },
    // {
    //     title: "Understanding the Path to Recovery",
    //     type: "Article",
    //     category: "Addiction & Recovery",
    //     image: "https://picsum.photos/400/254",
    //     dataAiHint: "support group"
    // },
    // {
    //     title: "Deep Breathing Exercises for Calm",
    //     type: "Video",
    //     category: "Coping Mechanisms",
    //     image: "https://picsum.photos/400/255",
    //     dataAiHint: "deep breathing"
    // },
]

export default function LearnPage() {
    const [content, setContent] = useState(learningContent);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Learning Center</h1>
            <p className="text-muted-foreground">Browse articles, videos, and resources to support your wellness journey.</p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for topics, articles, videos..." className="pl-10 text-base py-6 rounded-full" />
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {learningCategories.map(category => (
                    <Card key={category.name} className="text-center p-4 items-center justify-center flex flex-col gap-2 hover:bg-primary/5 cursor-pointer transition-colors">
                        <div className="text-primary">{category.icon}</div>
                        <p className="font-medium text-sm">{category.name}</p>
                    </Card>
                ))}
            </div>
        </div>
        
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Featured Content</h2>
            {content.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.map(c => (
                        <Link href="#" key={c.title}>
                            <Card className="overflow-hidden h-full group">
                                <div className="relative">
                                    <Image 
                                        src={c.image}
                                        alt={c.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                                        data-ai-hint={c.dataAiHint}
                                    />
                                    <div className={`absolute top-2 right-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-white ${c.type === 'Video' ? 'bg-primary' : 'bg-accent'}`}>
                                        {c.type === 'Video' ? <Video className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                                        <span>{c.type}</span>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-lg leading-tight group-hover:text-primary">{c.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{c.category}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        No learning content available yet.
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}
