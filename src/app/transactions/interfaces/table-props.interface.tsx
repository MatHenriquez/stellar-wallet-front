import { ITransaction } from './transaction.interface';

export interface ITableProps {
  transactions: ITransaction[];
  totalPages: number;
  getTransactions: (pageNumber: number, pageSize?: number) => void;
}

export interface ITableHeaderProps {
  headerText: string;
}

export interface ITableRowProps {
  transaction: ITransaction;
  currentPublicKey: string;
  index: number;
  rowsToShow: number;
}
