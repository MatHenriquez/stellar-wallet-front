import React from 'react';
import styles from '../styles/SubmitButton.module.css';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      className={styles.submitButton}
      disabled={isSubmitting}
      data-cy='submit-button'
    >
      Submit
    </button>
  );
};

export default SubmitButton;
