'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles/page.module.css';
import axiosInstance from '@/services/axios-instance';
import { IBalance, IBalancesResponse } from './interfaces/balances-response.interface';
import BalanceCard from './components/BalanceCard';
import Pagination from './components/Pagination';
import LoadingBalance from './components/LoadingBalance';

const Page = () => {
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [filterBalancesInZero, setFilterBalancesInZero] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const FIXED_PAGE_SIZE = 4;

  useEffect(() => {
    setIsLoading(true);
    const publicKey = localStorage.getItem('PUBLIC_KEY');
    axiosInstance
      .get<IBalancesResponse>(
        `/Transaction/Balance?PublicKey=${publicKey}&FilterZeroBalances=${filterBalancesInZero}&PageNumber=${page}&PageSize=${FIXED_PAGE_SIZE}`,
      )
      .then((response) => {
        setBalances(response.data.balances);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filterBalancesInZero, page]);

  return (
    <div className={styles.container} data-cy='balances-section'>
      <h2 className={styles.title} data-cy="balances-title">Balances</h2>
      <span className='max-h-2'>
        {isLoading ? (
          <p>Loading your balances...</p>
        ) : (
          <>
            <input
              id='filter-balances'
              type='checkbox'
              checked={filterBalancesInZero}
              onChange={() => setFilterBalancesInZero(!filterBalancesInZero)}
              data-cy='filter-balances'
            />
            <label htmlFor='filter-balances' className='p-2 text-sm'>
              Filter balances in zero
            </label>
          </>
        )}
      </span>
      <div className={styles.balancesContainer}>
        {balances.map((balance, index) =>
          isLoading ? (
            <LoadingBalance key={balance.asset} data-cy={`balance-card-${index}`}/>
          ) : (
            <BalanceCard key={balance.asset} asset={balance.asset} amount={balance.amount} data-cy={`balance-card-${index}`}/>
          ),
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalPage={totalPages} />
    </div>
  );
};

export default Page;
