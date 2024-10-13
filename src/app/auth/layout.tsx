import React, { ReactNode } from 'react';
import styles from './layout.module.css';
import BrandTitle from './common/components/BrandTitle';

interface IAuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: Readonly<IAuthLayoutProps>) {
  return (
    <div className={styles.container}>
      <BrandTitle />
      {children}
    </div>
  );
}
