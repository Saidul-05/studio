
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChangeWrapper } from '@/lib/firebase/auth';

type UserRole = 'admin' | 'mechanic' | 'provider' | 'user';

const ADMIN_EMAILS = ['admin@resq.auto'];
const MECHANIC_EMAILS = ['mechanic@resq.auto'];
const PROVIDER_EMAILS = ['provider@resq.auto'];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
});

const determineRole = (email: string | null): UserRole => {
    if (!email) return 'user';
    if (ADMIN_EMAILS.includes(email)) return 'admin';
    if (MECHANIC_EMAILS.includes(email)) return 'mechanic';
    if (PROVIDER_EMAILS.includes(email)) return 'provider';
    return 'user';
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeWrapper((user) => {
      setUser(user);
      setRole(determineRole(user?.email || null));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
