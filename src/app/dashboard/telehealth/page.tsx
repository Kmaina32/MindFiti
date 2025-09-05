
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, ShieldAlert, Video, UserCheck, Users, Languages, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

export default function TelehealthPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Telehealth Sessions</h1>
        <p className="text-muted-foreground">
          Book secure video sessions with mental health professionals. Available 24/7 with multilingual support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4">
                <ShieldAlert className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Crisis Support</CardTitle>
                  <CardDescription>Need immediate help? Book an emergency session with a crisis counselor.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4 flex flex-col items-center text-center gap-2">
                <Clock className="h-8 w-8 text-destructive" />
                <h3 className="font-semibold">Urgent Support</h3>
                <p className="text-sm text-muted-foreground">Within 2 hours</p>
                <Button variant="destructive" className="w-full mt-2">Book Urgent Session</Button>
              </Card>
               <Card className="p-4 flex flex-col items-center text-center gap-2">
                <Clock className="h-8 w-8 text-destructive" />
                <h3 className="font-semibold">Crisis Intervention</h3>
                <p className="text-sm text-muted-foreground">Within 30 minutes</p>
                 <Button variant="destructive" className="w-full mt-2">Book Crisis Session</Button>
              </Card>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Book Your Mental Health Session</CardTitle>
              <CardDescription>Select your preferred time and we'll match you with the most suitable provider.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="date">Select Date</Label>
                         <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="time">Select Time</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="session-type">Session Type</Label>
                        <Button variant="outline" className="w-full justify-start">
                            <Video className="mr-2 h-4 w-4" /> Video Call
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency Level</Label>
                         <Select defaultValue="routine">
                            <SelectTrigger>
                                <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="routine">Routine</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Notes for Provider (Optional)</Label>
                    <Textarea id="notes" placeholder="Briefly describe what you'd like to discuss..." rows={4}/>
                </div>
                <div className="flex justify-end">
                    <Button size="lg">Book Appointment</Button>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>View and manage your upcoming and past sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-4">No upcoming appointments.</p>
                    <Button variant="secondary" className="w-full">View History</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Find a Mental Health Professional</CardTitle>
                    <CardDescription>Filter by specialty and language to find the right therapist for you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select specialty" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="anxiety">Anxiety</SelectItem>
                                <SelectItem value="depression">Depression</SelectItem>
                                <SelectItem value="trauma">Trauma</SelectItem>
                                <SelectItem value="addiction">Addiction</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="language">Preferred Language</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="sw">Swahili</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-secondary/50">
                <CardHeader className="flex flex-row items-start gap-4">
                    <Image src="https://i.pravatar.cc/150?u=dr.mbiti@example.com" alt="Dr. Mbiti Mwondi" width={80} height={80} className="rounded-full border-2 border-primary"/>
                    <div>
                        <CardTitle>Professional Provider Assignment</CardTitle>
                        <CardDescription>We will assign you a qualified mental health professional who best suits your specific needs.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Our team is led by <span className="font-semibold text-primary">Dr. Mbiti Mwondi</span>, a board-certified psychiatrist with 15+ years of experience across Africa.</p>
                    <div className="space-y-2">
                         <div className="flex items-center gap-2 text-sm">
                            <UserCheck className="h-4 w-4 text-primary" /> <span>Specialized Matching</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-primary" /> <span>Cultural Competency</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                            <Languages className="h-4 w-4 text-primary" /> <span>Multilingual Support</span>
                         </div>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
