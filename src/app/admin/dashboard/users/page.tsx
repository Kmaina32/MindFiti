
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, File, PlusCircle, ListFilter } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, ChangeEvent } from "react";

const initialUsers: User[] = [
   {
    name: "Amina Kimani",
    email: "amina@example.com",
    role: "client",
    status: "Active",
    joined: "2024-07-28",
    avatar: "https://i.pravatar.cc/150?u=amina@example.com"
  },
  {
    name: "Michael Smith",
    email: "michael.s@test.co",
    role: "client",
    status: "Active",
    lastSession: "2024-07-25",
    avatar: "https://i.pravatar.cc/150?u=michael.s@test.co"
  },
  {
    name: "Jessica Williams",
    email: "jess.w@email.com",
    role: "client",
    status: "Onboarding",
    lastSession: "N/A",
    avatar: "https://i.pravatar.cc/150?u=jess.w@email.com"
  },
  {
    name: "Dr. Mbiti Mwondi",
    email: "dr.mbiti@example.com",
    role: "provider",
    status: "Active",
    lastSession: "N/A",
    avatar: "https://i.pravatar.cc/150?u=dr.mbiti@example.com"
  }
];

type User = {
  name: string;
  email: string;
  role: 'admin' | 'provider' | 'client';
  status: 'Active' | 'Inactive' | 'Onboarding';
  joined?: string;
  lastSession?: string;
  avatar: string;
}

export default function AdminUsersPage() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>(['Active', 'Inactive', 'Onboarding']);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return userList
        .filter(user => user.name.toLowerCase().includes(filter.toLowerCase()) || user.email.toLowerCase().includes(filter.toLowerCase()))
        .filter(user => statusFilter.includes(user.status))
  }, [userList, filter, statusFilter]);

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newUser: User = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as User['role'],
        status: formData.get('status') as User['status'],
        joined: new Date().toLocaleDateString('en-CA'),
        avatar: `https://i.pravatar.cc/150?u=${formData.get('email') as string}`
    };
    setUserList(prev => [...prev, newUser]);
    setIsDialogOpen(false);
    form.reset();
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View, manage, and edit all users on the platform.
        </CardDescription>
        <div className="flex items-center justify-between pt-4">
            <Input placeholder="Filter users by name or email..." className="max-w-sm" value={filter} onChange={(e) => setFilter(e.target.value)}/>
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
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={statusFilter.includes('Active')} onCheckedChange={(checked) => setStatusFilter(s => checked ? [...s, 'Active'] : s.filter(i => i !== 'Active'))}>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter.includes('Inactive')} onCheckedChange={(checked) => setStatusFilter(s => checked ? [...s, 'Inactive'] : s.filter(i => i !== 'Inactive'))}>
                      Inactive
                    </DropdownMenuCheckboxItem>
                     <DropdownMenuCheckboxItem checked={statusFilter.includes('Onboarding')} onCheckedChange={(checked) => setStatusFilter(s => checked ? [...s, 'Onboarding'] : s.filter(i => i !== 'Onboarding'))}>
                      Onboarding
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add User
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new user to the platform.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddUser}>
                          <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">Name</Label>
                                  <Input id="name" name="name" className="col-span-3" required/>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="email" className="text-right">Email</Label>
                                  <Input id="email" name="email" type="email" className="col-span-3" required/>
                              </div>
                               <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="role" className="text-right">Role</Label>
                                   <Select name="role" required>
                                      <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select a role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="client">Client</SelectItem>
                                          <SelectItem value="provider">Provider</SelectItem>
                                          <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                               <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="status" className="text-right">Status</Label>
                                   <Select name="status" required>
                                      <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select a status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="Active">Active</SelectItem>
                                          <SelectItem value="Inactive">Inactive</SelectItem>
                                           <SelectItem value="Onboarding">Onboarding</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                          </div>
                          <DialogFooter>
                              <Button type="submit">Create User</Button>
                          </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
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
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'provider' ? 'secondary' : 'default'} className="capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'outline'}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.joined || user.lastSession}</TableCell>
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
