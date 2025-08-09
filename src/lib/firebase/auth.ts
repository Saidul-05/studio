
'use client';

import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User,
    getAuth
} from 'firebase/auth';

export async function signUpWithEmail(email: string, password: string, displayName: string) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
}

export async function signInWithEmail(email: string, password: string) {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export async function sendPasswordReset(email: string) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
}

export async function signOutUser() {
    const auth = getAuth();
    await signOut(auth);
}

export function onAuthStateChangeWrapper(callback: (user: User | null) => void) {
    const auth = getAuth();
    return onAuthStateChanged(auth, callback);
}
