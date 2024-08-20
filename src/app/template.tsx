import React from 'react';
import AuthWrapper from './auth/auth-wrapper/AuthWrapper';

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
