import React, { ReactNode } from 'react';
import styles from './layout.module.css';
import Header from '../header/components/Header';

interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Readonly<IDashboardLayout>) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
