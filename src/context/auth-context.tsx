
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
            console.warn(`No user profile found in Firestore for UID: ${user.uid}. Creating a new record.`);
            setUserProfile(null);
          }
        } catch (error: any) {
            if (error.code === 'unavailable') {
                console.error("Firebase Error: The client is offline or the Firestore database is not enabled. Please go to your Firebase project console, select 'Firestore Database', and ensure it is created and enabled.");
            } else {
                console.error("An error occurred while fetching user profile:", error);
            }
            setUserProfile(null);
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
