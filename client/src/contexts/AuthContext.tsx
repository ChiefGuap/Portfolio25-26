import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, userData?: { full_name?: string; username?: string }) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple sign in function
  const signIn = async (email: string, password: string) => {
    console.log('🔐 Attempting sign in for:', email);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔐 Sign in response:', { data, error });

      if (error) {
        console.error('❌ Sign in failed:', error.message);
        setLoading(false);
        return { error };
      }

      if (data?.user) {
        console.log('✅ Sign in successful:', data.user.email);
        setUser(data.user);
        setLoading(false);
        return { error: null };
      }

      setLoading(false);
      return { error: { message: 'No user data received' } as AuthError };
    } catch (error) {
      console.error('❌ Sign in error:', error);
      setLoading(false);
      return { error: error as AuthError };
    }
  };

  // Simple sign up function
  const signUp = async (email: string, password: string, userData?: { full_name?: string; username?: string }) => {
    console.log('📝 Attempting sign up for:', email);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      console.log('📝 Sign up response:', { data, error });

      if (error) {
        console.error('❌ Sign up failed:', error.message);
        setLoading(false);
        return { error };
      }

      console.log('✅ Sign up successful - check your email for confirmation');
      setLoading(false);
      return { error: null };
    } catch (error) {
      console.error('❌ Sign up error:', error);
      setLoading(false);
      return { error: error as AuthError };
    }
  };

  // Simple sign out function
  const signOut = async () => {
    console.log('🚪 Signing out...');
    setUser(null);
    await supabase.auth.signOut();
    console.log('✅ Signed out successfully');
  };

  // Clear auth function
  const clearAuth = () => {
    console.log('🧹 Clearing auth...');
    setUser(null);
    setLoading(false);
  };

  // Check for existing session on startup
  useEffect(() => {
    console.log('🚀 AuthContext initialized - checking for existing session');
    
    const checkExistingSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.log('❌ Error checking session:', error.message);
          setUser(null);
        } else if (session?.user) {
          console.log('✅ Found existing session for:', session.user.email);
          setUser(session.user);
        } else {
          console.log('ℹ️ No existing session found');
          setUser(null);
        }
      } catch (err) {
        console.log('❌ Error getting session:', err);
        setUser(null);
      }
      setLoading(false);
    };

    checkExistingSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state change:', event, session?.user?.email);
      
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    clearAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;