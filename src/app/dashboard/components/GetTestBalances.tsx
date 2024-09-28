import React from 'react';
import { IGetTestBalanceProps } from '../interfaces/get-test-balance-props.interface';
import styles from '../styles/GetTestBalances.module.css';

const GetTestBalances = ({ getTestBalances, isLoading, isTesnet }: IGetTestBalanceProps) => {
  if (!isTesnet) return null;

  return (
    <>
      {!isLoading ? (
        <button
          className={styles.getTestBalancesButton}
          onClick={getTestBalances}
          data-cy='get-test-balances'
        >
          Get Test Balances
        </button>
      ) : (
        <button className={styles.loadingButton}>Loading...</button>
      )}
    </>
  );
};

export default GetTestBalances;
