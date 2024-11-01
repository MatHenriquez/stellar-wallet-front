'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles/page.module.css';
import axiosInstance from '@/services/axios-instance';
import { IBalance, IBalancesResponse } from './interfaces/balances-response.interface';
import BalanceCard from './components/BalanceCard';
import Pagination from './components/Pagination';
import LoadingBalance from './components/LoadingBalance';
import { toast, Toaster } from 'sonner';
import GetTestBalances from './components/GetTestBalances';
import { IPaymentPayload } from './interfaces/payment-payload.interface';
import PaymentModal from './components/PaymentModal';
import { IAsset } from '../auth/common/interfaces/asset.interface';

const Page = () => {
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [filterBalancesInZero, setFilterBalancesInZero] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const FIXED_PAGE_SIZE = 4;
  const [isGettingTestBalances, setIsGettingTestBalances] = useState<boolean>(false);
  const [isTestnet] = useState<boolean>(process.env.NEXT_PUBLIC_HORIZON_NETWORK === 'testnet');
  const [isSendingPayment, setIsSendingPayment] = useState<boolean>(false);
  const [paymentAsset, setPaymentAsset] = useState<IAsset>({} as IAsset);

  const getTestBalances = () => {
    setIsGettingTestBalances(true);
    toast.loading('Getting test balances...');

    const publicKey = localStorage.getItem('PUBLIC_KEY');

    axiosInstance
      .post<IBalancesResponse>(
        `/Transaction/TestFund`,
        { PublicKey: publicKey },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(() => {
        toast.dismiss();
        toast.success('Test balances successfully added.', {
          style: {
            background: 'green',
            color: 'white',
          },
        });
        getBalances();
      })
      .catch((error) => {
        toast.dismiss();
        toast.error('An error occurred while getting test balances.', {
          style: {
            background: 'red',
            color: 'white',
          },
        });
        console.error(error);
      })
      .finally(() => {
        setIsGettingTestBalances(false);
      });
  };

  const getBalances = () => {
    setIsLoading(true);
    const publicKey = localStorage.getItem('PUBLIC_KEY');
    axiosInstance
      .get<IBalancesResponse>(
        `/Transaction/Balance?PublicKey=${publicKey}&FilterZeroBalances=${filterBalancesInZero}&PageNumber=${page}&PageSize=${FIXED_PAGE_SIZE}`,
      )
      .then((response) => {
        setBalances(response.data.value?.balances ?? []);
        setTotalPages(response.data.value?.totalPages ?? 1);
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while fetching your balances.', {
          style: {
            background: 'red',
            color: 'white',
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendPayment = async (values: IPaymentPayload) => {
    setIsSendingPayment(true);

    toast.loading('Sending payment...');

    axiosInstance
      .post('/Transaction/Payment', values)
      .then(() => {
        toast.dismiss();
        getBalances();
        toast.success('Payment sent successfully', {
          position: 'top-right',
          style: {
            background: 'green',
            color: 'white',
          },
        });
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error?.response ?? error);
        toast.error('There was an error sending your payment. Try again in a few minutes.', {
          position: 'top-right',
          style: {
            background: 'red',
            color: 'white',
          },
        });
      })
      .finally(() => {
        setIsSendingPayment(false);
        const dialog = document?.getElementById(
          `payment-modal-${paymentAsset.code}`,
        ) as HTMLDialogElement | null;
        dialog?.close();
      });
  };

  useEffect(() => {
    getBalances();
  }, [filterBalancesInZero, page]);

  return (
    <div className={styles.container} data-cy='balances-section'>
      <Toaster position='top-right' />
      <h2 className={styles.title} data-cy='balances-title'>
        Balances
      </h2>
      <PaymentModal
        sendPayment={sendPayment}
        isSendingPayment={isSendingPayment}
        assetName={paymentAsset.code}
        assetIssuer={paymentAsset.issuer}
      />
      <span className='max-h-2'>
        {isLoading ? (
          <p>Loading your balances...</p>
        ) : (
          <>
            {balances.length > 0 ? (
              <>
                <input
                  id='filter-balances'
                  type='checkbox'
                  checked={filterBalancesInZero}
                  onChange={() => setFilterBalancesInZero(!filterBalancesInZero)}
                  data-cy='filter-balances'
                />
                <label htmlFor='filter-balances' className='p-2 text-sm'>
                  Filter balances in zero
                </label>
              </>
            ) : (
              <div className={styles.noBalancesSection}>
                <p data-cy='no-balances-message'>You don&apos;t have any balance yet.</p>
                <GetTestBalances
                  getTestBalances={getTestBalances}
                  isLoading={isGettingTestBalances}
                  isTesnet={isTestnet}
                />
              </div>
            )}
          </>
        )}
      </span>
      <div className={styles.balancesContainer}>
        {balances.map((balance) =>
          isLoading ? (
            <LoadingBalance key={balance.asset} />
          ) : (
            <BalanceCard
              key={balance.asset}
              asset={{ code: balance.asset, issuer: balance.issuer } as IAsset}
              amount={balance.amount}
              issuer={balance.issuer}
              paymentAsset={paymentAsset}
              setPaymentAsset={setPaymentAsset}
            />
          ),
        )}
      </div>
      {balances.length > 0 && <Pagination page={page} setPage={setPage} totalPage={totalPages} />}
    </div>
  );
};

export default Page;
