
"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const { userProfile } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, preferences, and data.
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
                <Input
                  id="firstName"
                  placeholder="Amina"
                  defaultValue={userProfile?.firstName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Kimani"
                   defaultValue={userProfile?.lastName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  placeholder="amina@example.com"
                  defaultValue={userProfile?.email ?? ""}
                />
              </div>
              <Button disabled>Update Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
            Manage how you receive notifications from us.
            </p>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive updates and summaries via email.</p>
                    </div>
                    <Switch id="email-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Get reminders and alerts on your device.</p>
                    </div>
                    <Switch id="push-notifications" disabled />
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
      <Separator />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold text-destructive">
            Delete Account
          </h2>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all of your data. This action
            cannot be undone.
          </p>
        </div>
        <div className="md:col-span-2">
          <Card className="border-destructive">
            <CardContent className="flex items-center justify-between pt-6">
              <p className="font-semibold">I understand the consequences.</p>
              <Button variant="destructive" disabled>Delete My Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
