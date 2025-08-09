
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { user, loading, role } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (loading) return;

      if (!user) {
        router.push('/login');
        return;
      }

      if (pathname.startsWith('/admin') && role !== 'admin') {
        router.push('/');
      } else if (pathname.startsWith('/mechanic') && role !== 'mechanic') {
        router.push('/');
      } else if (pathname.startsWith('/provider') && role !== 'provider') {
        router.push('/');
      }

    }, [user, loading, role, router, pathname]);

    if (loading || !user) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Skeleton className="h-32 w-full max-w-md" />
            <Skeleton className="h-12 w-full max-w-md mt-4" />
            <Skeleton className="h-64 w-full max-w-md mt-4" />
        </div>
      );
    }

    return <Component {...props} />;
  };
  AuthComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  return AuthComponent;
};

export default withAuth;
