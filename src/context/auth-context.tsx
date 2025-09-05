
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { BrandedLoader } from "@/components/branded-loader";
import { useRouter, usePathname } from "next/navigation";


interface UserProfile {
  role: 'client' | 'provider' | 'admin';
  // Add other user profile properties here
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: UserProfile | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userProfile: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const profile = docSnap.data() as UserProfile;
          setUserProfile(profile);
          // If user is on a signup/login page but has a full profile, redirect them
          if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
            switch(profile.role) {
                case 'admin': router.replace('/admin/dashboard'); break;
                case 'provider': router.replace('/provider/dashboard'); break;
                default: router.replace('/dashboard'); break;
            }
          }
        } else {
          setUserProfile(null);
          // User is authenticated but doesn't have a profile in Firestore.
          // Redirect them to complete their profile.
          if (!pathname.startsWith('/signup/profile')) {
             router.replace('/signup/profile');
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return <BrandedLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
