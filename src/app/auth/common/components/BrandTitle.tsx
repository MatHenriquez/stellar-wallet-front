import React from 'react';
import styles from '../styles/BrandTitle.module.css';

const BrandTitle = () => {
  return (
    <div className={styles.brandImage} data-cy='brand-section'>
      <h1 className={styles.title} data-cy='brand-title'>
        Welcome to <span className={styles.brandName}>Crippy!</span>
        <p className={styles.subtitle} data-cy='brand-subtitle'>
          Your Stellar best friend
        </p>
      </h1>
    </div>
  );
};

export default BrandTitle;
