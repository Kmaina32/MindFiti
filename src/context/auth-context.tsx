
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { BrandedLoader } from "@/components/branded-loader";
import { useRouter, usePathname } from "next/navigation";

export interface UserProfile {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  role: 'client' | 'provider' | 'admin';
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

const AUTH_PAGES = ['/login', '/signup', '/signup/profile'];
const PUBLIC_PAGES = ['/']; // Add any other public pages here

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser);

      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profile = docSnap.data() as UserProfile;
          setUserProfile(profile);

          // User is logged in and has a profile.
          // If they are on an auth page, redirect them to the correct dashboard.
          if (AUTH_PAGES.includes(pathname)) {
            switch(profile.role) {
                case 'admin': router.replace('/admin/dashboard'); break;
                case 'provider': router.replace('/provider/dashboard'); break;
                default: router.replace('/dashboard'); break;
            }
          }
        } else {
          // User is logged in but doesn't have a profile document.
          setUserProfile(null);
          // Force them to the profile completion page.
          if (pathname !== '/signup/profile') {
             router.replace('/signup/profile');
          }
        }
      } else {
        // User is not logged in.
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return <BrandedLoader />;
  }

  // If page is not public and user is not authenticated, show loader until redirect happens.
  const isPublicPage = PUBLIC_PAGES.includes(pathname);
  if (!isPublicPage && !user) {
    // You could also return null or a loader here, but this check is handled
    // by individual page layouts/components that use the useAuth hook.
    // For now, BrandedLoader is a safe bet during the brief redirect period.
     if (!AUTH_PAGES.includes(pathname)) {
        return <BrandedLoader />;
     }
  }


  return (
    <AuthContext.Provider value={{ user, loading, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
