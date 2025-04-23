import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Add axios interceptor to include token in requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthError {
  message: string;
  status?: number;
}

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const response = await axios.get<User>(`${API_URL}/profile`);
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If there's an error (like invalid token), clear the auth state
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string } & User>(`${API_URL}/login`, {
        email,
        password,
      });
      
      const { token, ...userData } = response.data;
      
      // Store the token
      localStorage.setItem('token', token);
      
      // Update state
      setIsLoggedIn(true);
      setUser(userData);

      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "An unexpected error occurred";
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { 
        error: {
          message: errorMessage,
          status: axiosError.response?.status
        }
      };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string } & User>(`${API_URL}`, {
        name,
        email,
        password,
      });
      
      // After successful signup, automatically log in
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUser(userData);
      
      toast({
        title: "Signup Successful",
        description: "Your account has been created successfully.",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "An unexpected error occurred";
      
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { 
        error: {
          message: errorMessage,
          status: axiosError.response?.status
        }
      };
    }
  };

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('token');
      
      // Update state
      setIsLoggedIn(false);
      setUser(null);

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
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
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
