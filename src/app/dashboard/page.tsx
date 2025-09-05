"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BookHeart,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [firstName, setFirstName] = useState("there");
  const [userRole, setUserRole] = useState<string | null>(null);


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        if (!user.uid) return;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName || "there");
          setUserRole(userData.role);

          if (userData.role === 'provider') {
            router.replace('/provider/dashboard');
          } else if (userData.role === 'admin') {
            router.replace('/admin/dashboard');
          }

        } else {
          router.push("/login") // Or maybe a page to complete profile
        }
      };
      fetchUserData();
    }
  }, [user, router]);


  if (loading || !user || userRole === 'provider' || userRole === 'admin') {
    return null // Or a loading spinner
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {firstName}!</h1>
        <p className="text-muted-foreground">Here's a look at your wellness journey. Ready to continue?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ClipboardCheck className="h-8 w-8 text-primary" />
              <CardTitle>Start an Assessment</CardTitle>
            </div>
            <CardDescription>
              Understand your current state of mind with a personalized wellness assessment. It's quick, insightful, and completely private.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/assessment">
                Take an Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <BookHeart className="h-8 w-8 text-primary" />
              <CardTitle>Write in Your Journal</CardTitle>
            </div>
            <CardDescription>
              Clear your mind, express your feelings, and track your mood. Our AI can provide a helpful summary of your entry.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/journal">
                Create a New Entry <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
