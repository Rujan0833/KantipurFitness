
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

// Initialize Supabase client with fallback values if env vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if credentials are missing
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Flag to track if we've shown the configuration warning
let hasShownConfigWarning = false;

type AuthContextType = {
  isLoggedIn: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signup: (email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  isSupabaseConfigured: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const { toast } = useToast();
  const isSupabaseConfigured = !!supabase;

  useEffect(() => {
    // Show configuration warning only once
    if (!supabase && !hasShownConfigWarning) {
      console.warn('Supabase client not initialized. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      toast({
        title: "Authentication Not Configured",
        description: "The authentication service needs to be configured. Please connect to Supabase using the green button in the top right.",
        variant: "destructive",
        duration: 6000,
      });
      hasShownConfigWarning = true;
      return;
    }

    // Only run if supabase client is available
    if (!supabase) return;

    // Check for active session on load
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        setUser(data.session.user);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsLoggedIn(true);
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const login = async (email: string, password: string) => {
    if (!supabase) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not configured. Please connect to Supabase using the green button in the top right.",
        variant: "destructive",
        duration: 6000,
      });
      return { error: new Error("Supabase client not initialized") };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }

    toast({
      title: "Login Successful",
      description: "You have been successfully logged in.",
    });
    
    return { error: null };
  };

  const signup = async (email: string, password: string) => {
    if (!supabase) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not configured. Please connect to Supabase using the green button in the top right.",
        variant: "destructive",
        duration: 6000,
      });
      return { error: new Error("Supabase client not initialized") };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }

    toast({
      title: "Signup Successful",
      description: "Your account has been created. Please verify your email if required.",
    });
    
    return { error: null };
  };

  const logout = async () => {
    if (!supabase) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not configured. Please connect to Supabase using the green button in the top right.",
        variant: "destructive",
        duration: 6000,
      });
      return;
    }

    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
