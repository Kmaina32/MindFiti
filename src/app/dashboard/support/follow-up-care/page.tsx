
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MessageSquare, Calendar, Pill } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const goals: any[] = [];

export default function FollowUpCarePage() {
    const [wellnessGoals, setWellnessGoals] = useState(goals);

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
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                     <Button size="sm" disabled>View Appointments</Button>
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
                    <p className="text-muted-foreground">You have no unread messages.</p>
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
                {wellnessGoals.length > 0 ? wellnessGoals.map(goal => (
                    <div key={goal.text} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <CheckCircle className={`h-5 w-5 ${goal.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <p>{goal.text}</p>
                        </div>
                        <Button variant="ghost" size="sm">View Progress</Button>
                    </div>
                )) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>You haven't set any wellness goals with your provider yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Recommended Resources</CardTitle>
                <CardDescription>Your provider has recommended these resources to support you.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="text-center py-8 text-muted-foreground">
                    <p>No recommended resources from your provider at this time.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
