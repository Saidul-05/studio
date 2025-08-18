
'use client';

import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    type User,
    type Auth,
} from 'firebase/auth';

export async function signUpWithEmail(auth: Auth, email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
}

export async function signInWithEmail(auth: Auth, email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export async function signInWithGoogle(auth: Auth) {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
}

export async function sendPasswordReset(auth: Auth, email: string) {
    return sendPasswordResetEmail(auth, email);
}

export async function signOutUser(auth: Auth) {
    await signOut(auth);
}

export function onAuthStateChangeWrapper(auth: Auth, callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}
