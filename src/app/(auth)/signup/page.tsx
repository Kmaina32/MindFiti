
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ variant: "destructive", title: "Signup Failed", description: "Email is required." });
      return;
    }
    
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        toast({
          variant: "destructive",
          title: "Email already in use",
          description: "This email is already registered. Please log in.",
        });
        router.push('/login');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      // The AuthProvider will detect the new user and redirect to /signup/profile
      
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The AuthProvider will handle redirecting to /signup/profile if it's a new user
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Sign-Up Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="h-10 w-10 text-primary" />
              </Link>
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Start your journey to mental wellness today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <Checkbox id="terms" required />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      By creating an account, you agree to our{" "}
                      <Link href="/terms" className="underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </Label>
                  </div>
                <Button type="submit" className="w-full mt-2">
                  Create Account
                </Button>
              </div>
            </form>
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" className="w-full mt-4" onClick={handleGoogleSignUp}>
                <svg
                  className="mr-2 h-4 w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8 0 123.5 111.8 11.8 244 11.8c67.6 0 124 24.4 167.3 64.8L352.5 137.2C322.2 109.2 286.7 91.8 244 91.8c-83.8 0-152.3 67.2-152.3 150s68.5 150 152.3 150c90.8 0 138.8-63.8 142.5-98.2H244v-73.8h236c1.3 12.8 2 26.2 2 40.8z"
                  ></path>
                </svg>
                Google
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline ml-1">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
  );
}
