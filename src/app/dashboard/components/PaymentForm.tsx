import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { IPaymentPayload } from '../interfaces/payment-payload.interface';
import { IPaymentProps } from '../interfaces/payments-props.interface';
import styles from '../styles/PaymentForm.module.css';
import { paymentSchema } from '../helpers/payment-schema';

const PaymentForm = ({ sendPayment, isSendingPayment, assetName }: IPaymentProps) => {
  const initialValues: IPaymentPayload = {
    destinationPublicKey: '',
    amount: '',
    memo: '',
  };

  const handleCancelPayment = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });

    const dialog = document.getElementById(
      `payment-modal-${assetName}`,
    ) as HTMLDialogElement | null;
    dialog?.close();

    const errorMessages = document.querySelectorAll('.text-red-500');
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = '';
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={paymentSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await sendPayment(values);
          setSubmitting(false);

          values.destinationPublicKey = '';
          values.amount = '';
          values.memo = '';
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form
            className='flex flex-col gap-2 rounded-md bg-main-blue-300 p-6 text-lg font-extrabold text-main-blue-900 shadow-md'
            onSubmit={handleSubmit}
          >
            <label htmlFor='destinationPublicKey'>Destination public Key</label>
            <Field
              id='destinationPublicKey'
              name='destinationPublicKey'
              placeholder='Destination public key...'
              className='bg-main-blue-900 p-2 text-main-blue-100'
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.destinationPublicKey}
              value={values.destinationPublicKey}
            />
            <ErrorMessage
              name='destinationPublicKey'
              component='p'
              className='text-sm text-red-500'
            />

            <label htmlFor='amount'>Amount</label>
            <Field
              id='amount'
              name='amount'
              placeholder='100'
              className='bg-main-blue-900 p-2 text-main-blue-100'
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.amount}
              value={values.amount}
            />
            <ErrorMessage name='amount' component='p' className='text-sm text-red-500' />

            <label htmlFor='memo'>Memo</label>
            <Field
              id='memo'
              name='memo'
              placeholder='123456'
              className='bg-main-blue-900 p-2 text-main-blue-100'
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.memo}
              value={values.memo}
            />
            <ErrorMessage name='memo' component='p' className='text-sm text-red-500' />

            {!isSendingPayment ? (
              <>
                <button
                  className={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    Object.keys(touched).length === 0
                      ? styles.disabledSendPaymentButton
                      : styles.sendPaymentButton
                  }
                  type='submit'
                  data-cy='send-payment-button'
                >
                  Send
                </button>
                <button
                  className={styles.cancelPaymentButton}
                  type='button'
                  data-cy='cancel-payment-button'
                  onClick={handleCancelPayment}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className={styles.loadingButton} disabled>
                Loading...
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
