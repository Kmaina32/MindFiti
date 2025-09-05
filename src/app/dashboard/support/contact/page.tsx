
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare } from "lucide-react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
        >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    );
}

export default function ContactUsPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                    Have a question or need support? Fill out the form and we'll get back to you soon.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Amina Kimani" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="amina@example.com" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., Question about my account" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Please describe your issue or question in detail..." rows={6} />
                    </div>
                    <Button size="lg">Submit Message</Button>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-sm text-muted-foreground">hello@mbitmed.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Call Us</h3>
                            <p className="text-sm text-muted-foreground">US: +1 (305) 504-7126</p>
                            <p className="text-sm text-muted-foreground">Kenya: +254 727 085 726</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <WhatsAppIcon className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">WhatsApp</h3>
                            <p className="text-sm text-muted-foreground">+1 (208) 329-8151</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Operating Hours</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-muted-foreground">9:00 AM - 5:00 PM (EAT)</p>
                    <p className="font-semibold mt-2">Weekends & Holidays</p>
                    <p className="text-muted-foreground">Closed</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
