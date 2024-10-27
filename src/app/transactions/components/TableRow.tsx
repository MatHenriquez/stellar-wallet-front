import React from 'react';
import { ITableRowProps } from '../interfaces/table-props.interface';

const TableRow = ({ transaction, currentPublicKey, index, rowsToShow }: ITableRowProps) => {
  const getBorderClass = (index: number, rowsToShow: number) => {
    if (index === 0) return 'border-t-2 border-black';
    if (index === rowsToShow) return 'border-y';
    return 'border-t';
  };

  const NATIVE_ASSET_CODE = 'XLM';
  const NATIVE_ASSET_NAME = 'native';
  const TRANSACTION_RESULTS = {
    SUCCESS: 'Completed',
    FAILURE: 'Failed',
  };

  const getTextColorClass = (sentOrSuccessfull: boolean) => {
    const receivedOrSuccessfullColor = 'text-green-500';
    const sentOrFailedColor = 'text-red-500';

    return sentOrSuccessfull ? receivedOrSuccessfullColor : sentOrFailedColor;
  };

  return (
    <tr
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#222E3A]/[6%]'}`}
      data-cy={'transaction-row' + index}
    >
      <td
        className={`px-3 py-2 text-base font-normal text-main-blue-950 ${getBorderClass(index, rowsToShow)} whitespace-nowrap`}
        data-cy='asset-cell'
      >
        {transaction.asset === NATIVE_ASSET_NAME ? NATIVE_ASSET_CODE : transaction.asset}
      </td>
      <td
        className={`px-3 py-2 text-base font-normal ${getBorderClass(index, rowsToShow)} ${getTextColorClass(transaction.to === currentPublicKey)} whitespace-nowrap`}
        data-cy='amount-cell'
      >
        {transaction.to === currentPublicKey ? `+${transaction.amount}` : `-${transaction.amount}`}
      </td>
      <td
        className={`px-4 py-5 text-base font-normal text-main-blue-950 ${getBorderClass(index, rowsToShow)}`}
        data-cy='date-cell'
      >
        {transaction.createdAt}
      </td>
      <td
        className={`px-4 py-5 text-base font-normal ${getBorderClass(index, rowsToShow)} ${getTextColorClass(transaction.wasSuccessful)}`}
        data-cy='status-cell'
      >
        {transaction.wasSuccessful ? TRANSACTION_RESULTS.SUCCESS : TRANSACTION_RESULTS.FAILURE}
      </td>
      <td
        className={`px-3 py-2 text-base font-normal text-main-blue-950 ${getBorderClass(index, rowsToShow)} whitespace-nowrap`}
        data-cy='destinatary-sender-cell'
      >
        {transaction.from === currentPublicKey ? transaction.to : transaction.from}
      </td>
    </tr>
  );
};

export default TableRow;
