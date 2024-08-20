'use client';
import axiosInstance from '@/services/axios-instance';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();

  const handleRedirect = (currentUrl: string, isAuthenticated: boolean) => {
    const shouldRedirectToDashboard = currentUrl === '/auth/login' || currentUrl === '/auth/signup' || currentUrl === '/';

    if (shouldRedirectToDashboard) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else if (!isAuthenticated && currentUrl !== '/auth/login' && currentUrl !== '/auth/signup') {
        router.push('/auth/login');
      }
    } else if (!isAuthenticated) {
      router.push('/auth/login');
    }
  };

  useEffect(() => {
    axiosInstance
      .get('/Auth/UserToken')
      .then((response) => {
        if (response.data) {
          handleRedirect(window.location.pathname, true);
        }
      })
      .catch((error) => {
        console.error(error);
        handleRedirect(window.location.pathname, false);
      });
  }, []);
  return <>{children}</>;
};

export default AuthWrapper;
