export interface IBalancesResponse {
  balances: IBalance[];
  totalPages: number;
}

export interface IBalance {
  asset: string;
  amount: string;
}
