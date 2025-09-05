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
  Users,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"

export default function ProviderDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [firstName, setFirstName] = useState("Provider");

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
          setFirstName(userData.firstName || "Provider");
          if (userData.role !== 'provider') {
            router.replace('/dashboard');
          }
        } else {
            router.push('/login')
        }
      };
      fetchUserData();
    }
  }, [user, router]);


  if (loading || !user) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {firstName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your practice.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle>Manage Clients</CardTitle>
            </div>
            <CardDescription>
              View your client list, check their progress, and manage their care plans.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/provider/dashboard/clients">
                View Clients <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-primary" />
              <CardTitle>Manage Appointments</CardTitle>
            </div>
            <CardDescription>
              Schedule new appointments, view your upcoming sessions, and manage your availability.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/provider/dashboard/appointments">
                View Calendar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
