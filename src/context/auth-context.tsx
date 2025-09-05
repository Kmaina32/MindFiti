
"use client";

import { createContext, useContext, ReactNode } from "react";

// Mock Auth Context when auth is removed
export interface UserProfile {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  role: 'client' | 'provider' | 'admin';
}

interface AuthContextType {
  user: null;
  loading: boolean;
  userProfile: null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  userProfile: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={{ user: null, loading: false, userProfile: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
