import React from 'react';
import PaymentForm from './PaymentForm';
import { IPaymentProps } from '../interfaces/payments-props.interface';

const PaymentModal = ({ sendPayment, isSendingPayment, assetName, assetIssuer }: IPaymentProps) => {
  return (
    <dialog id={`payment-modal-${assetName}`} className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box bg-main-blue-900'>
        <h3 className='text-4xl font-bold text-main-blue-200'>Payment</h3>
        <div className='modal-action flex flex-col'>
            <div className='flex flex-col rounded-md p-6 shadow-md bg-main-blue-900'>
              <PaymentForm
                sendPayment={sendPayment}
                isSendingPayment={isSendingPayment}
                assetName={assetName}
                assetIssuer={assetIssuer}
              />
            </div>
        </div>
      </div>
    </dialog>
  );
};

export default PaymentModal;
