
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user, loading, userProfile } = useAuth();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("client");

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signup');
    }
     if (!loading && user && userProfile) {
      // User has a profile, so redirect them away from here
      handleRedirect(userProfile.role);
    }
    if (user) {
        const nameParts = user.displayName?.split(' ') || [];
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
    }
  }, [user, loading, userProfile, router]);


  const handleRedirect = (role: string) => {
    switch (role) {
      case 'admin':
        router.replace('/admin/dashboard');
        break;
      case 'provider':
        router.replace('/provider/dashboard');
        break;
      default:
        router.replace('/dashboard');
        break;
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in to complete your profile." });
      return;
    }
     if (!firstName || !lastName) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please enter your first and last name." });
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      
      // Assign admin role if the email matches
      const userRole = user.email === 'gmaina4242@gmail.com' ? 'admin' : role;
      
      await setDoc(userRef, {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        role: userRole,
      });

      toast({
        title: "Profile Complete",
        description: "Welcome to MindFiti!",
      });

      handleRedirect(userRole);

    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };
  
  if (loading || !user || userProfile) {
    // Show branded loader or nothing while we wait for auth state or redirect
    return null; 
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="h-10 w-10 text-primary" />
              </Link>
            </div>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Just one more step to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCompleteProfile}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Amina"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Kimani"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Sign up as</Label>
                  <RadioGroup
                    defaultValue="client"
                    className="grid grid-cols-2 gap-4"
                    value={role}
                    onValueChange={setRole}
                  >
                    <div>
                      <RadioGroupItem value="client" id="client" className="peer sr-only" />
                      <Label
                        htmlFor="client"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Client
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="provider"
                        id="provider"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="provider"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Provider
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full mt-2">
                  Complete Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}
