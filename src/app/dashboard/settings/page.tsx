"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Update your personal information.
          </p>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Amina" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Kimani" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="amina@example.com" disabled />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
       <Separator />
       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold text-destructive">Delete Account</h2>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all of your data. This action cannot be undone.
          </p>
        </div>
        <div className="md:col-span-2">
           <Card className="border-destructive">
            <CardContent className="flex items-center justify-between pt-6">
                <p className="font-semibold">I understand the consequences.</p>
                <Button variant="destructive">Delete My Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
