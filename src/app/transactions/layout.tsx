import React, { ReactNode } from 'react';
import styles from './layout.module.css';
import Header from '../header/components/Header';

interface ITransactionsLayout {
  children: ReactNode;
}

export default function TransactionsLayout({ children }: Readonly<ITransactionsLayout>) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
