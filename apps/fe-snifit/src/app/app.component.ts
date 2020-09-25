import { Component } from '@angular/core';
import { PartnerService } from '../core/services/partner.service';
import { LoanService } from '../core/services/loan.service';
import { GenerateDataService } from '../core/services/generate-data.service';
import { PartialAccountDto, PartialLoanDto } from '@mataf-poc/ods-mongoose';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mataf-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PartnerService, LoanService, GenerateDataService],
})
export class AppComponent {
  public partnerId: string = '';
  public isLoadingAccounts = false;
  public accountList: PartialAccountDto[];
  public accountLoans: PartialLoanDto[];

  constructor(
    private accountService: PartnerService,
    private loanService: LoanService,
    private genService: GenerateDataService,
    private snackBar: MatSnackBar
  ) {}

  public loadPartnerAccountsAndLoans(): void {
    this.isLoadingAccounts = true;

    this.accountService
      .getPartnerAccounts(this.partnerId)
      .toPromise()
      .then((res) => {
        this.accountList = res.docs || [];
        if (this.accountList && this.accountList.length) {
          // get loans
          this.getAccountLoans();
        } else {
          this.isLoadingAccounts = false;
        }
      })
      .catch(() => {
        this.isLoadingAccounts = false;
      });
  }

  public getAccountLoans(): void {
    this.loanService
      .getAccountsLoans(this.accountList.map((a) => a.number))
      .toPromise()
      .then((res) => {
        this.isLoadingAccounts = false;
        this.accountLoans = res.docs;
      })
      .catch(() => {
        this.isLoadingAccounts = false;
      });
  }

  public generateData(): void {
    this.genService.generate().subscribe(() => {
      this.snackBar.open('Data generated successfully', null, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  public cleanData(): void {
    this.genService.clean().subscribe(() => {
      this.snackBar.open('Data cleaned successfully', null, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
