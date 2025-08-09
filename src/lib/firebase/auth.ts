
'use client';

import { 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User,
    getAuth,
    FirebaseApp
} from 'firebase/auth';

export async function signUpWithEmail(app: FirebaseApp, email: string, password: string, displayName: string) {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
}

export async function signInWithEmail(app: FirebaseApp, email: string, password: string) {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export async function sendPasswordReset(app: FirebaseApp, email: string) {
    const auth = getAuth(app);
    return sendPasswordResetEmail(auth, email);
}

export async function signOutUser(app: FirebaseApp) {
    const auth = getAuth(app);
    await signOut(auth);
}

export function onAuthStateChangeWrapper(app: FirebaseApp, callback: (user: User | null) => void) {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, callback);
}
