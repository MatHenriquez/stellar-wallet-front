import React from 'react';
import { IBalance } from '../interfaces/balances-response.interface';
import styles from '../styles/BalanceCard.module.css';

const BalanceCard = ({ asset, amount, issuer }: IBalance) => {
  return (
    <div className={styles.container} data-cy={`balance-card-${asset.toLowerCase()}`}>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>Asset: {asset == 'native' ? 'XLM' : asset}</h2>
        <p>Amount: {amount}</p>
        <p>Issuer: {issuer}</p>
        <div className={styles.cardAction}>
          <button className={styles.cardButton}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
