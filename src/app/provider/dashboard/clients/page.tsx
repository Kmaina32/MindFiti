"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const clients: any[] = [
  // {
  //   name: "Amina Kimani",
  //   email: "amina@example.com",
  //   status: "Active",
  //   lastSession: "2024-07-28",
  //   avatar: "https://i.pravatar.cc/150?u=amina@example.com"
  // },
  // {
  //   name: "Michael Smith",
  //   email: "michael.s@test.co",
  //   status: "Active",
  //   lastSession: "2024-07-25",
  //   avatar: "https://i.pravatar.cc/150?u=michael.s@test.co"
  // },
  // {
  //   name: "Jessica Williams",
  //   email: "jess.w@email.com",
  //   status: "Onboarding",
  //   lastSession: "N/A",
  //   avatar: "https://i.pravatar.cc/150?u=jess.w@email.com"
  // },
];


export default function ClientsPage() {
  const [clientList, setClientList] = useState(clients);

  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold">Your Clients</h1>
            <p className="text-muted-foreground">
            View and manage your list of clients.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Client
        </Button>
       </div>
        <Card>
        <CardHeader>
            <Input placeholder="Filter clients..." className="max-w-sm"/>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientList.length > 0 ? clientList.map((client) => (
                    <TableRow key={client.email}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                                <Image src={client.avatar} alt={client.name} width={40} height={40} className="rounded-full"/>
                                <div>
                                    <div className="font-medium">{client.name}</div>
                                    <div className="text-sm text-muted-foreground">{client.email}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>{client.status}</Badge>
                        </TableCell>
                         <TableCell>{client.lastSession}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                <DropdownMenuItem>Assign Assessment</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No clients found.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </div>
  );
}
