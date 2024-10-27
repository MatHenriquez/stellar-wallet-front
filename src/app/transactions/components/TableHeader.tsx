import React from 'react';
import { ITableHeaderProps } from '../interfaces/table-props.interface';

const TableHeader = ({ headerText }: ITableHeaderProps) => {
  const formatDataCy = (text: string) => text.split(' ')[0].toLowerCase() + '-header';

  return (
    <th
      className='whitespace-nowrap px-3 py-3 font-bold text-main-blue-950 sm:text-base'
      data-cy={formatDataCy(headerText)}
    >
      {headerText}
    </th>
  );
};

export default TableHeader;
