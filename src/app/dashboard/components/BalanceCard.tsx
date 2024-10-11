import React, { useEffect, useState } from 'react';
import { IBalanceCardProps } from '../interfaces/balances-response.interface';
import styles from '../styles/BalanceCard.module.css';

const BalanceCard = ({
  asset,
  amount,
  paymentAssetName,
  setPaymentAssetName,
}: IBalanceCardProps) => {
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  useEffect(() => {
    if (shouldOpenModal) {
      const dialog = document?.getElementById(`payment-modal-${paymentAssetName}`) as HTMLDialogElement | null;
      dialog?.showModal();
      setShouldOpenModal(false);
    }
  }, [paymentAssetName, shouldOpenModal]);

  const handleSendClick = () => {
    setPaymentAssetName(asset);
    setShouldOpenModal(true);
  };

  return (
    <div className={styles.container} data-cy={`balance-card-${asset.toLowerCase()}`}>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>Asset: {asset == 'native' ? 'XLM' : asset}</h2>
        <p>Amount: {amount}</p>
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