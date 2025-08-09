
'use client';

import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User
} from 'firebase/auth';
import { auth } from './config';

export async function signUpWithEmail(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
}

export async function signInWithEmail(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export async function sendPasswordReset(email: string) {
    return sendPasswordResetEmail(auth, email);
}

export async function signOutUser() {
    await signOut(auth);
}

export function onAuthStateChangeWrapper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}
