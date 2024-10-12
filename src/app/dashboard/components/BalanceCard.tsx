import React, { useEffect, useState } from 'react';
import { IBalanceCardProps } from '../interfaces/balances-response.interface';
import styles from '../styles/BalanceCard.module.css';

const BalanceCard = ({
  asset,
  amount,
  paymentAsset,
  setPaymentAsset,
  issuer,
}: IBalanceCardProps) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  useEffect(() => {
    if (shouldOpenModal) {
      const dialog = document?.getElementById(
        `payment-modal-${paymentAsset.code}`,
      ) as HTMLDialogElement | null;
      dialog?.showModal();
      setShouldOpenModal(false);
    }
  }, [paymentAsset, shouldOpenModal]);

  const handleSendClick = () => {
    setPaymentAsset(asset);
    setShouldOpenModal(true);
  };

  return (
    <div className={styles.container} data-cy={`balance-card-${asset.code?.toLowerCase()}`}>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>Asset: {asset.code == 'native' ? 'XLM' : asset.code}</h2>
        <p>Amount: {amount}</p>
         <span className={styles.issuer}>Issuer: {issuer}</span>
        <div className={styles.cardAction}>
          <button className={styles.cardButton} onClick={handleSendClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
