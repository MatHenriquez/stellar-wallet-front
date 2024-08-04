'use client';
import React from 'react';
import { Formik } from 'formik';
import styles from '../styles/SignUpForm.module.css';
import AuthFormInput from '../../common/components/AuthFormInput';
import { NewUserSchema } from '../utils/NewUserSchema';
import { EmailIcon } from '../../common/components/icons/email';
import { NameIcon } from '../../common/components/icons/names';
import { KeyIcon } from '../../common/components/icons/key';
import axiosInstance from '@/services/axios-instance';
import { Toaster, toast } from 'sonner';
import { CreateUserRequest } from '../utils/create-user-request';
import { initialValues } from '../utils/constants';
import SubmitButton from '../../common/components/SubmitButton';
import SwapAuthLink from '../../common/components/SwapAuthLink';

const SignUpForm = () => {
  return (
    <>
      <Toaster position='top-right' data-cy='toast' />
      <Formik
        initialValues={initialValues}
        validationSchema={NewUserSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          toast.promise(
            new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, 500);
            }),
            {
              loading: 'Creating account...',
            },
          );

          const requestValues: CreateUserRequest = {
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          };

          if (values.publicKey && values.secretKey) {
            requestValues.publicKey = values.publicKey;
            requestValues.secretKey = values.secretKey;
          }

          const requestPayload = new CreateUserRequest(requestValues);
          axiosInstance
            .post('/User', requestPayload)
            .then(() => {
              toast.success('Account created successfully!', {
                style: {
                  background: 'green',
                  color: 'white',
                },
              });
            })
            .catch((error) => {
              console.error(error);
              toast.error('Error creating account.', {
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
          <form className={styles.form} onSubmit={handleSubmit} data-cy='signup-form'>
            <p className={styles.signUptitle} data-cy='title'>
              Register
            </p>
            <SwapAuthLink
              name='login'
              link='/auth/login'
              description='Already have an account?'
              text='Login'
            />
            <AuthFormInput
              type='text'
              name='name'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.name}
              value={values.name}
              touched={touched.name}
              label='Name'
              icon={NameIcon}
            />
            <AuthFormInput
              type='text'
              name='lastName'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.lastName}
              value={values.lastName}
              touched={touched.lastName}
              label='Surname'
              icon={NameIcon}
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
            <AuthFormInput
              type='password'
              name='confirmPassword'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.confirmPassword}
              value={values.confirmPassword}
              touched={touched.confirmPassword}
              label='Confirm Password'
              icon={KeyIcon}
            />
            <p className={styles.optionalTitle} data-cy='optional-title'>
              *Optional{' '}
              <span className={styles.optionalSubtitle}>
                (if you don&apos;t have Stellar keys, we will create them for you!)
              </span>
            </p>
            <AuthFormInput
              type='text'
              name='publicKey'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.publicKey}
              value={values.publicKey}
              touched={touched.publicKey}
              label='Public Key'
              icon={KeyIcon}
            />
            <AuthFormInput
              type='password'
              name='secretKey'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.secretKey}
              value={values.secretKey}
              touched={touched.secretKey}
              label='Secret Key'
              icon={KeyIcon}
            />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
