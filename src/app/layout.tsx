
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/useAuth';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    if (getApps().length === 0) {
      const app = initializeApp(firebaseConfig);
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true,
        });
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>ResQ Auto</title>
        <meta name="description" content="24/7 Auto Assistance." />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
            <AuthWrapper>
                <Toaster />
                {children}
            </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
