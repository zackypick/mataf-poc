import { Currency } from '@mataf-poc/models';

export class MatafSubAccountBalance {
  valueDate: number;

  currency: Currency;

  withdrawalBalance: number;

  closingBalance: number;

  currentBalance: number;
}
