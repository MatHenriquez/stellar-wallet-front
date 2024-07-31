import React from 'react';
import SignUpForm from './components/sign-up-form/SignUpForm';
import styles from './styles/SignUp.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.container} data-cy='signup-container'>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
