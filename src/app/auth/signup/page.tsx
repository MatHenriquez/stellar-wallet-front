import React from 'react';
import SignUpForm from './components/sign-up-form/SignUpForm';
import styles from './styles/SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
