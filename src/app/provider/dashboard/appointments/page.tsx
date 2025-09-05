"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const appointments = [
    {
        name: "Amina Kimani",
        time: "10:00 AM - 11:00 AM",
        type: "Virtual",
        avatar: "https://i.pravatar.cc/150?u=amina@example.com"
    },
    {
        name: "Michael Smith",
        time: "2:00 PM - 2:30 PM",
        type: "In-Person",
        avatar: "https://i.pravatar.cc/150?u=michael.s@test.co"
    }
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
           <CardHeader>
               <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Appointments Calendar</CardTitle>
                        <CardDescription>Manage your schedule.</CardDescription>
                    </div>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Appointment
                    </Button>
               </div>
           </CardHeader>
            <CardContent>
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                />
            </CardContent>
        </Card>
      </div>
      <div>
        <Card>
            <CardHeader>
                <CardTitle>Upcoming - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {appointments.map(appt => (
                    <div key={appt.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                        <Image src={appt.avatar} alt={appt.name} width={40} height={40} className="rounded-full"/>
                        <div className="flex-grow">
                            <p className="font-semibold">{appt.name}</p>
                            <p className="text-sm text-muted-foreground">{appt.time}</p>
                        </div>
                        <Badge variant={appt.type === 'Virtual' ? 'default' : 'secondary'}>{appt.type}</Badge>
                    </div>
                ))}
                {appointments.length === 0 && <p className="text-muted-foreground">No upcoming appointments.</p>}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
