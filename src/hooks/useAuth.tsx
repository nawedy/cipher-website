"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { executeQuery, executeQuerySingle, executeCommand } from '@/lib/neon/client';
import type { User } from '@/types/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (userData: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const userData = localStorage.getItem('user_data');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const query = `
        SELECT id, email, password_hash, first_name, last_name, company, 
               job_title, phone, avatar_url, role, status, email_verified, 
               two_factor_enabled, created_at, updated_at, last_login
        FROM users 
        WHERE email = $1 AND status = 'active'
      `;
      
      const userData = await executeQuerySingle<User>(query, [email]);
      
      if (!userData) {
        return { success: false, error: 'Invalid email or password' };
      }

      await executeCommand(
        'UPDATE users SET last_login = NOW() WHERE id = $1',
        [userData.id]
      );

      localStorage.setItem('auth_token', 'demo_token_' + userData.id);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setUser(userData);
      return { success: true };
      
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An error occurred during sign in' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: SignUpData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      const existingUser = await executeQuerySingle(
        'SELECT id FROM users WHERE email = $1',
        [userData.email]
      );
      
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      const query = `
        INSERT INTO users (
          email, password_hash, first_name, last_name, company, 
          job_title, phone, role, status, email_verified, 
          two_factor_enabled, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, 'client', 'active', false, false, NOW(), NOW()
        ) RETURNING *
      `;
      
      const newUser = await executeQuerySingle<User>(query, [
        userData.email,
        'hashed_password',
        userData.firstName,
        userData.lastName,
        userData.company || null,
        userData.jobTitle || null,
        userData.phone || null
      ]);

      if (newUser) {
        localStorage.setItem('auth_token', 'demo_token_' + newUser.id);
        localStorage.setItem('user_data', JSON.stringify(newUser));
        
        setUser(newUser);
        return { success: true };
      }
      
      return { success: false, error: 'Failed to create user' };
      
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'An error occurred during sign up' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const userData = await executeQuerySingle(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
      
      if (!userData) {
        return { success: false, error: 'No user found with this email' };
      }

      return { success: true };
      
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'An error occurred during password reset' };
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      const updateFields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at');
      const setClause = updateFields.map((field, index) => `${field} = $${index + 2}`).join(', ');
      const values = [user.id, ...updateFields.map(field => updates[field as keyof User])];

      const query = `
        UPDATE users 
        SET ${setClause}, updated_at = NOW()
        WHERE id = $1 
        RETURNING *
      `;
      
      const updatedUser = await executeQuerySingle<User>(query, values);
      
      if (updatedUser) {
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      }
      
      return { success: false, error: 'Failed to update profile' };
      
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'An error occurred during profile update' };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 