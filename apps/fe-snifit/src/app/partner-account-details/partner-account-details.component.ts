import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PartialAccountDto, PartialLoanDto } from '@mataf-poc/ods-mongoose';
import { LoanService } from '../../core/services/loan.service';
import {
  NewLoanWizardComponent,
  NewLoanAccountData,
} from '../new-loan-wizard/new-loan-wizard.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'partner-account-details',
  templateUrl: './partner-account-details.component.html',
  styleUrls: ['./partner-account-details.component.scss'],
  providers: [LoanService],
})
export class PartnerAccountDetailsComponent implements OnInit {
  @Input() accounts: PartialAccountDto[];
  @Input() loans: PartialLoanDto[];

  @Output() loanTaken = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public openNewLoanDialog(accountNumber: string, creditScore: number): void {
    const dialogRef = this.dialog.open<
      NewLoanWizardComponent,
      NewLoanAccountData
    >(NewLoanWizardComponent, {
      minWidth: '500px',
      data: { accountNumber, creditScore },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loanTaken.next();
      }
    });
  }
}
