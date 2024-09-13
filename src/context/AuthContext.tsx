//!IMPORTANT: This file is not used yet

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession, signIn, signOut } from "next-auth/react";

interface AuthContextType {
  session: any; 
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    await signIn("credentials", { email, password, redirect: false });
    const session = await getSession();
    setSession(session);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};