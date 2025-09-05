
"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const initials = userProfile ? `${userProfile.firstName[0]}${userProfile.lastName[0]}` : "U"


  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">
                View and manage your personal information.
            </p>
        </div>
      <Card>
        <CardHeader>
             <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${userProfile.email}`} alt={`${userProfile.firstName} ${userProfile.lastName}`} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{userProfile.firstName} {userProfile.lastName}</CardTitle>
                    <CardDescription>Role: {userProfile.role}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={userProfile.firstName} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={userProfile.lastName} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={userProfile.email ?? ""} readOnly />
          </div>
          <Button disabled>Update Profile (coming soon)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
