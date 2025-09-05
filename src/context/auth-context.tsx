
"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { BrandedLoader } from "@/components/branded-loader";

export interface UserProfile {
  uid: string;
  email: string | null;
  firstName: string;
  lastName:string;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            console.warn(`No user profile found in Firestore for UID: ${user.uid}. A new record will be created on signup or first login if needed.`);
            setUserProfile(null);
          }
        } catch (error: any) {
            if (error.code === 'unavailable') {
                // This error means the client is offline or Firestore is not enabled.
                // We will handle this gracefully by setting userProfile to null and letting the UI
                // decide what to do. A warning is logged in firebase.ts.
                setUserProfile(null);
            } else {
                console.error("An error occurred while fetching user profile:", error);
                setUserProfile(null);
            }
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, userProfile, loading };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <BrandedLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
