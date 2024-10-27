import React, { useState, useMemo } from 'react';
import { ITableProps } from '../interfaces/table-props.interface';
import Pagination from '@/app/common/components/Pagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const TransactionsTable = ({ transactions, totalPages, getTransactions }: ITableProps) => {
  const [customPagination, setCustomPagination] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsToShow] = useState<number>(transactions.length);
  const [currentPublicKey] = useState<string | null>(localStorage.getItem('PUBLIC_KEY'));

  const nextPage = () => {
    getTransactions(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value: number) => {
    getTransactions(value);
    setCurrentPage(value);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      getTransactions(currentPage - 1);
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(0);
  };

  const COLUMN_TITLES = ['Asset', 'Amount', 'Date and Time', 'Status', 'Destinatary / Sender'];

  useMemo(() => {
    setCustomPagination(Array<number>(totalPages).fill(0));
  }, []);

  return (
    <div
      className='flex items-center justify-center bg-main-blue-100 pb-8 pt-6 lg:h-fit lg:min-h-[60vh] lg:w-11/12'
      data-cy='transactions-table'
    >
      <div className='w-full max-w-[100vw] px-2'>
        <div className='w-full max-w-[100vw] overflow-x-scroll md:overflow-auto 2xl:max-w-none'>
          <table className='font-inter w-full table-auto overflow-scroll border text-left md:overflow-auto'>
            <thead className='w-full rounded-lg text-base font-semibold'>
              <tr className='bg-[#222E3A]/[6%]'>
                {COLUMN_TITLES.map((title) => (
                  <TableHeader key={title} headerText={title} />
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, index) => (
                <TableRow
                  key={transaction.id + index}
                  transaction={transaction}
                  currentPublicKey={currentPublicKey as string}
                  index={index}
                  rowsToShow={rowsToShow}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          customPagination={customPagination}
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          changePage={changePage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
