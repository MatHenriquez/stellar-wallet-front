'use client';

import { Formik } from 'formik';
import React from 'react';
import { toast, Toaster } from 'sonner';
import { ILoginResponse, LoginInitialValues, LoginRequest } from '../utils/constants';
import { LoginUserSchema } from '../utils/login-user-schema';
import styles from '../styles/LoginForm.module.css';
import AuthFormInput from '../../common/components/AuthFormInput';
import { EmailIcon } from '../../common/components/icons/email';
import { KeyIcon } from '../../common/components/icons/key';
import axiosInstance from '@/services/axios-instance';
import { useRouter } from 'next/navigation';
import SubmitButton from '../../common/components/SubmitButton';
import SwapAuthLink from '../../common/components/SwapAuthLink';

const LoginForm = () => {
  const router = useRouter();

  return (
    <>
      <Toaster position='top-right' />

      <Formik
        initialValues={LoginInitialValues}
        validationSchema={LoginUserSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          toast.promise(
            new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 500);
            }),
            {
              loading: 'Logging in...',
            },
          );

          const loginRequest = new LoginRequest(values.email, values.password);

          axiosInstance
            .post('/Auth/Login', loginRequest)
            .then((response) => {
              toast.success('Logged in successfully!', {
                style: {
                  background: 'green',
                  color: 'white',
                },
              });

              const responsePayload: ILoginResponse = response.data;

              localStorage.setItem('ACCESS_TOKEN', responsePayload.token);
              localStorage.setItem('PUBLIC_KEY', responsePayload.publicKey);

              router.push('/home');
            })
            .catch((error) => {
              console.error(error);
              toast.error(error?.response.data ?? 'Error loggin in...', {
                style: {
                  background: 'red',
                  color: 'white',
                },
              });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit} data-cy='login-form'>
            <p className={styles.signInTitle} data-cy='title'>
              Login
            </p>
            <SwapAuthLink 
              name='signup'
              link='/auth/signup'
              description='Don’t have an account?'
              text='Sign up'
            />
            <AuthFormInput
              type='email'
              name='email'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
              value={values.email}
              touched={touched.email}
              label='Email'
              icon={EmailIcon}
            />

            <AuthFormInput
              type='password'
              name='password'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              value={values.password}
              touched={touched.password}
              label='Password'
              icon={KeyIcon}
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
