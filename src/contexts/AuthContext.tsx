
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client with error handling
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabase = null;
}

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
  const isSupabaseConfigured = !!supabase && !!supabaseUrl && !!supabaseAnonKey;

  useEffect(() => {
    // Show configuration warning if needed
    if (!isSupabaseConfigured) {
      console.warn('Supabase client not initialized or configured properly. Please check your environment variables.');
      toast({
        title: "Authentication Not Configured",
        description: "The authentication service is not properly configured. Please make sure Supabase is connected correctly.",
        variant: "destructive",
        duration: 6000,
      });
      return;
    }

    // Check for active session on load
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setIsLoggedIn(true);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();

    // Listen for auth changes
    let authListener;
    try {
      const { data } = supabase.auth.onAuthStateChange(
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
      authListener = data.subscription;
    } catch (error) {
      console.error('Error setting up auth listener:', error);
    }

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, [toast]);

  const login = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not configured properly.",
        variant: "destructive",
        duration: 6000,
      });
      return { error: new Error("Supabase client not initialized properly") };
    }

    try {
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
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signup = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not configured properly.",
        variant: "destructive",
        duration: 6000,
      });
      return { error: new Error("Supabase client not initialized properly") };
    }

    try {
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
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      toast({
        title: "Authentication Error",
        description: "Authentication service is not configured properly.",
        variant: "destructive",
        duration: 6000,
      });
      return;
    }

    try {
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
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
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
