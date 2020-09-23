import { Component, OnInit, Input } from '@angular/core';
import { PartialAccountDto, PartialLoanDto } from '@mataf-poc/ods-mongoose';
import { LoanService } from '../../core/services/loan.service';
import {
  NewLoanWizardComponent,
  NewLoanAccountData,
} from '../new-loan-wizard/new-loan-wizard.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'partner-account-list',
  templateUrl: './partner-account-list.component.html',
  styleUrls: ['./partner-account-list.component.scss'],
  providers: [LoanService],
})
export class PartnerAccountListComponent implements OnInit {
  @Input() accounts: PartialAccountDto[];
  public loans: PartialLoanDto[];

  public subAccountsColumns: string[] = [
    'number',
    'code',
    'type',
    'currentBalance',
    'valueDate',
  ];

  public loansColumns: string[] = [
    'loanNumber',
    'amount',
    'code',
    'dateTaken',
    'dateClosed',
    'monthlyPayment',
    'loanTermMonths',
    'hasDefaulted',
  ];

  constructor(private loanService: LoanService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // get accounts loans
    if (!this.accounts) {
      return;
    }
    this.loanService
      .getAccountsLoans(this.accounts.map((a) => a.number))
      .subscribe((res) => {
        this.loans = res.docs;
      });
  }

  public openNewLoanDialog(accountNumber: string, creditScore: number): void {
    const dialogRef = this.dialog.open<
      NewLoanWizardComponent,
      NewLoanAccountData
    >(NewLoanWizardComponent, {
      minWidth: '500px',
      data: { accountNumber, creditScore },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
