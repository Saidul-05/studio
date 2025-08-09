
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { firebaseConfig } from './config';

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;

if (typeof window !== 'undefined') {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
        if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
            try {
                initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
                    isTokenAutoRefreshEnabled: true,
                });
            } catch (error) {
                console.error("Error initializing App Check:", error);
            }
        }
    } else {
        app = getApp();
    }
    auth = getAuth(app);
}

// @ts-ignore
export { app, auth };
