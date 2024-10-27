'use client';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import styles from './styles/page.module.css';
import { ITransaction } from './interfaces/transaction.interface';
import axiosInstance from '@/services/axios-instance';
import { ITransactionResponse } from './interfaces/transaction-response.interface';
import TransactionsTable from './components/TransactionsTable';

const Transactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  const getTransactions = (pageNumber: number) => {
    toast.loading('Getting transactions...');
    axiosInstance
      .get<ITransactionResponse>(`/Transaction/Payment?pageNumber=${pageNumber}&pageSize=5`)
      .then((response) => {
        setTransactions(response.data.value.payments)
        setTotalPages(response.data.value.totalPages);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to get transactions.', {
          position: 'top-right',
          style: {
            background: 'red',
            color: 'white',
          },
        });
      })
      .finally(() => {
        toast.dismiss();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTransactions(1);
  }, [publicKey]);

  useEffect(() => {
    const key = localStorage.getItem('PUBLIC_KEY');
    setPublicKey(key);
  }, []);

  return (
    <div className={styles.container}>
      <Toaster position='top-right' />
      <h2 className={styles.title} data-cy='transactions-title'>
        Transactions
      </h2>
      {(() => {
        if (isLoading) {
          return <p>Loading...</p>;
        } else if (transactions && transactions.length > 0) {
          return (
            <TransactionsTable
              transactions={transactions}
              totalPages={totalPages as number}
              getTransactions={getTransactions}
            />
          );
        } else {
          return <p data-cy='no-transactions-message'>No transactions found.</p>;
        }
      })()}
    </div>
  );
};

export default Transactions;
