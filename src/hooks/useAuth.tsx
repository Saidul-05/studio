
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApps, initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase/config';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';


type UserRole = 'admin' | 'mechanic' | 'provider' | 'user';

const ADMIN_EMAILS = ['admin@resq.auto'];
const MECHANIC_EMAILS = ['mechanic@resq.auto'];
const PROVIDER_EMAILS = ['provider@resq.auto'];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: UserRole | null;
  isFirebaseInitialized: boolean;
  app: FirebaseApp | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  isFirebaseInitialized: false,
  app: null,
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
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    let appInstance: FirebaseApp;
    if (getApps().length === 0) {
        appInstance = initializeApp(firebaseConfig);
    } else {
        appInstance = getApp();
    }
    setApp(appInstance);
    
    const auth = getAuth(appInstance);

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
            initializeAppCheck(appInstance, {
                provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
                isTokenAutoRefreshEnabled: true,
            });
        } catch (error) {
            console.error("Error initializing App Check:", error);
        }
    }
    setFirebaseInitialized(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setRole(determineRole(user?.email || null));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role, isFirebaseInitialized, app }}>
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
