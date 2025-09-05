
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MessageSquare, Video, Calendar, Pill } from "lucide-react";
import Link from "next/link";

export default function FollowUpCarePage() {
  return (
    <div className="space-y-8">
       <div>
            <h1 className="text-3xl font-bold">Your Follow-up Care Plan</h1>
            <p className="text-muted-foreground">Stay on track with your wellness journey. Here's what's next.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-primary"/>
                        <CardTitle>Upcoming Appointment</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg font-semibold">Follow-up with Dr. John O.</p>
                    <p className="text-muted-foreground">Tuesday, August 26th at 11:00 AM</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm">Join Video Call</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <Pill className="h-8 w-8 text-primary"/>
                        <CardTitle>Medication Reminders</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                     <p className="text-muted-foreground">No active medication reminders.</p>
                     <Button variant="secondary" size="sm">Manage Medications</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <MessageSquare className="h-8 w-8 text-primary"/>
                        <CardTitle>Provider Messages</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You have 1 unread message.</p>
                    <Button variant="secondary" size="sm" className="mt-2">View Messages</Button>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Your Wellness Goals</CardTitle>
                <CardDescription>These are the goals you set with your provider. Track your progress and stay motivated.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <p>Practice mindfulness meditation for 10 minutes daily.</p>
                    </div>
                    <Button variant="ghost" size="sm">View Progress</Button>
                </div>
                 <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <p>Go for a 30-minute walk at least 3 times a week.</p>
                    </div>
                    <Button variant="ghost" size="sm">View Progress</Button>
                </div>
                 <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <p>Complete one journal entry every two days.</p>
                    </div>
                    <Button variant="ghost" size="sm">View Progress</Button>
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Recommended Resources</CardTitle>
                <CardDescription>Your provider has recommended these resources to support you.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                <Link href="/dashboard/learn" className="p-4 border rounded-lg hover:bg-muted">
                    <h4 className="font-semibold">Article: Understanding Cognitive Behavioral Therapy (CBT)</h4>
                    <p className="text-sm text-muted-foreground">Learn about the principles of CBT and how it can help.</p>
                </Link>
                 <Link href="/dashboard/learn" className="p-4 border rounded-lg hover:bg-muted">
                    <h4 className="font-semibold">Video: Guided Breathing for Anxiety</h4>
                    <p className="text-sm text-muted-foreground">A 5-minute guided exercise to help manage moments of anxiety.</p>
                </Link>
            </CardContent>
        </Card>
    </div>
  );
}
