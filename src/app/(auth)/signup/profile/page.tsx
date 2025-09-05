
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { BrandedLoader } from "@/components/branded-loader";

function CompleteProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, userProfile } = useAuth();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // If no user is logged in, they shouldn't be here
        router.replace('/signup');
      } else if (userProfile) {
        // User already has a profile, so redirect away
        router.replace('/dashboard');
      } else {
        // Pre-fill names from Google display name or from URL params for email signup
        const nameParts = user.displayName?.split(' ') || [];
        setFirstName(searchParams.get('firstName') || nameParts[0] || '');
        setLastName(searchParams.get('lastName') || nameParts.slice(1).join(' ') || '');
      }
    }
  }, [user, authLoading, userProfile, router, searchParams]);

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
    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      
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

      // The AuthProvider will handle the final redirect
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An unexpected error occurred. Please try again.",
      });
      setLoading(false);
    }
  };
  
  if (authLoading || !user || userProfile) {
    // Show loader while we wait for auth state or redirect
    return <BrandedLoader />; 
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
                    disabled={loading}
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
                    disabled={loading}
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
                  disabled={loading}
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
              
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Saving..." : "Complete Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Wrap the component in a Suspense boundary to use `useSearchParams`
export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<BrandedLoader />}>
      <CompleteProfileForm />
    </Suspense>
  );
}
