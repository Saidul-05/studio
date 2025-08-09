
'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordReset } from '@/lib/firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { isFirebaseInitialized, app } = useAuth();
    const [email, setEmail] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!app) return;
        setIsLoading(true);
        try {
            await sendPasswordReset(app, email);
            toast({
                title: 'Password Reset Email Sent',
                description: 'Please check your inbox for instructions to reset your password.',
            });
            router.push('/login');
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                        <Icons.logo className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordReset} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading || !isFirebaseInitialized}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading || !isFirebaseInitialized}>
                            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Remember your password?{' '}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
