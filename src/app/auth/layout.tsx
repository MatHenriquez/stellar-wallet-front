import React, { ReactNode } from 'react';
import styles from './layout.module.css';
import BrandTitle from './common/components/BrandTitle';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayoutt({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div className={styles.container}>
      <BrandTitle />
      {children}
    </div>
  );
}
