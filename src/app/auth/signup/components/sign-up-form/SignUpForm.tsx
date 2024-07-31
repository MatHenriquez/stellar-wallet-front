'use client';
import React from 'react';
import { Formik } from 'formik';
import styles from './styles/SignUpForm.module.css';
import SignUpInput from './SignUpInput';
import { NewUserSchema } from '../../utils/NewUserSchema';
import { EmailIcon } from './icons/email';
import { NameIcon } from './icons/names';
import { KeyIcon } from './icons/key';
import axiosInstance from '@/services/axios-instance';
import { Toaster, toast } from 'sonner';
import { CreateUserRequest } from '../../utils/create-user-request';
import { initialValues } from '../../utils/constants';

const SignUpForm = () => {
  return (
    <>
      <Toaster position='top-right' />
      <Formik
        initialValues={initialValues}
        validationSchema={NewUserSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

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
              toast.error('Error creating account: ' + error.response?.data, {
                style: {
                  background: 'red',
                  color: 'white',
                },
              });
            });
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.signUptitle}>Welcome!</p>
            <SignUpInput
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
            <SignUpInput
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
            <SignUpInput
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
            <SignUpInput
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
            <SignUpInput
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
            <p className={styles.optionalTitle}>Optional</p>
            <SignUpInput
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
            <SignUpInput
              type='text'
              name='secretKey'
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.secretKey}
              value={values.secretKey}
              touched={touched.secretKey}
              label='Secret Key'
              icon={KeyIcon}
            />
            <button type='submit' className={styles.submitButton} disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;