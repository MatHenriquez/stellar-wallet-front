import React from 'react';
import styles from '../styles/LoadingBalance.module.css';

const LoadingBalance = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardBody}>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingBalance;
