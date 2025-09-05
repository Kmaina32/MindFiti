
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";


export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("client");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const handleRedirect = (role: string) => {
    switch (role) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'provider':
        router.push('/provider/dashboard');
        break;
      default:
        router.push('/dashboard');
        break;
    }
  };

  const createFirestoreUser = async (user: User, userRole: string, fName?: string, lName?: string) => {
     await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: fName || user.displayName?.split(" ")[0] || "",
        lastName: lName || user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        role: userRole,
      });
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if user with this email already exists
      const userDoc = await getDoc(doc(db, "users-by-email", email));
      if (userDoc.exists()) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: "This email is already in use. Please log in.",
        });
        router.push('/login');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRole = email === 'gmaina4242@gmail.com' ? 'admin' : role;

      await createFirestoreUser(user, userRole, firstName, lastName);
      // Also create a lookup document to prevent duplicate emails
      await setDoc(doc(db, "users-by-email", user.email!), { uid: user.uid });
      
      toast({
        title: "Account Created",
        description: "Welcome to MindFiti!",
      });

      handleRedirect(userRole);

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
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // User already exists, treat as login
        handleRedirect(docSnap.data().role);
      } else {
        // New user, prompt for role
        setPendingUser(user);
        setShowRoleDialog(true);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Sign-Up Failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleRoleSelection = async () => {
    if (!pendingUser) return;
    
    const userRole = pendingUser.email === 'gmaina4242@gmail.com' ? 'admin' : role;

    try {
      await createFirestoreUser(pendingUser, userRole);
      await setDoc(doc(db, "users-by-email", pendingUser.email!), { uid: pendingUser.uid });

      
      toast({
        title: "Account Created",
        description: "Welcome to MindFiti!",
      });

      setShowRoleDialog(false);
      handleRedirect(userRole);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };


  return (
    <>
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

      <AlertDialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>One Last Step</AlertDialogTitle>
            <AlertDialogDescription>
              Please select your account type to complete your registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup
              defaultValue="client"
              className="grid grid-cols-2 gap-4"
              value={role}
              onValueChange={setRole}
            >
              <div>
                <RadioGroupItem value="client" id="g-client" className="peer sr-only" />
                <Label
                  htmlFor="g-client"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Client
                </Label>
              </div>
              <div>
                <RadioGroupItem value="provider" id="g-provider" className="peer sr-only" />
                <Label
                  htmlFor="g-provider"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Provider
                </Label>
              </div>
            </RadioGroup>
          </div>
          <AlertDialogFooter>
            <Button onClick={handleRoleSelection} className="w-full">
              Complete Sign-Up
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

    