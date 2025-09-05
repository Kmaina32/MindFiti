"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, File, PlusCircle, ListFilter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const users: any[] = [
  // {
  //   name: "Amina Kimani",
  //   email: "amina@example.com",
  //   role: "client",
  //   status: "Active",
  //   joined: "2023-06-23",
  //   avatar: "https://i.pravatar.cc/150?u=amina@example.com"
  // },
  // {
  //   name: "Dr. John O.",
  //   email: "john.o@clinic.com",
  //   role: "provider",
  //   status: "Active",
  //   joined: "2023-05-15",
  //   avatar: "https://i.pravatar.cc/150?u=john.o@clinic.com"
  // },
  //   {
  //   name: "Michael Smith",
  //   email: "michael.s@test.co",
  //   role: "client",
  //   status: "Inactive",
  //   joined: "2023-07-01",
  //   avatar: "https://i.pravatar.cc/150?u=michael.s@test.co"
  // },
  // {
  //   name: "Admin User",
  //   email: "admin@mindfiti.co",
  //   role: "admin",
  //   status: "Active",
  //   joined: "2023-01-01",
  //   avatar: "https://i.pravatar.cc/150?u=admin@mindfiti.co"
  // },
];

export default function AdminUsersPage() {
  const [userList, setUserList] = useState(users);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View, manage, and edit all users on the platform.
        </CardDescription>
        <div className="flex items-center justify-between pt-4">
            <Input placeholder="Filter users..." className="max-w-sm"/>
            <div className="flex items-center gap-2">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add User
                  </span>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.length > 0 ? userList.map((user) => (
                <TableRow key={user.email}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full"/>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'outline'}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
