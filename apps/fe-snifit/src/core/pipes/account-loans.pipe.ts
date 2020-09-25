import { Pipe, PipeTransform } from '@angular/core';
import { PartialLoanDto } from '@mataf-poc/ods-mongoose';

@Pipe({ name: 'accountLoans' })
export class AccountLoansPipe implements PipeTransform {
  transform(loans: PartialLoanDto[], accountNumber: string) {
    return loans.filter((loan) => loan.accountNumber === accountNumber);
  }
}
