
"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { db } from "@/lib/firebase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import {
  Users,
  BarChart3,
} from "lucide-react"
import { doc, getDoc } from "firebase/firestore"

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [firstName, setFirstName] = useState("Admin");

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
          setFirstName(userData.firstName || "Admin");
          if (userData.role !== 'admin') {
            router.replace(userData.role === 'provider' ? '/provider/dashboard' : '/dashboard');
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
        <p className="text-muted-foreground">Platform administration overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>
              View, edit, and manage all users on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for user stats */}
            <p>Total Users: 0</p>
            <p>Clients: 0</p>
            <p>Providers: 0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <CardTitle>Platform Analytics</CardTitle>
            </div>
            <CardDescription>
              Key metrics and insights into platform usage.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for analytics */}
             <p>Assessments Taken: 0</p>
             <p>Journal Entries: 0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
