import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanProductService } from '../../core/services/loan-product.service';
import { LoanService } from '../../core/services/loan.service';
import { PartialLoanProductDto } from '@mataf-poc/ods-mongoose';
import { RiskResult } from '@mataf-poc/models';

export interface NewLoanAccountData {
  accountNumber: string;
  creditScore: number;
}

export interface NewLoanDetails {
  amount: number;
  term: number;

  loanProductCode: number;
}
export interface LoanCheckResult {
  eligible?: boolean;
  riskResult?: RiskResult;
}

@Component({
  selector: 'mataf-poc-new-loan-wizard',
  templateUrl: './new-loan-wizard.component.html',
  styleUrls: ['./new-loan-wizard.component.scss'],
  providers: [LoanProductService, LoanService],
})
export class NewLoanWizardComponent implements OnInit {
  public loanProductFormGroup: FormGroup;
  public loanDetailsFormGroup: FormGroup;

  public loanDetails: Partial<NewLoanDetails> = {};

  public selectedProduct: PartialLoanProductDto;

  public loanProducts: PartialLoanProductDto[];

  public checkResult: LoanCheckResult = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewLoanAccountData,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewLoanWizardComponent>,
    private loanProductService: LoanProductService,
    private loanService: LoanService
  ) {}

  ngOnInit() {
    this.loanProductFormGroup = this.formBuilder.group({
      loanProductCtrl: ['', Validators.required],
    });
    this.loanDetailsFormGroup = this.formBuilder.group({
      loanAmountCtrl: [, Validators.required],
      loanTermCtrl: [, Validators.required],
    });

    this.loanProductService.getLoanProducts().subscribe((res) => {
      this.loanProducts = res.filter(
        (p) => this.data.creditScore >= p.creditScoreLimit
      );
    });
  }

  onSelectedProduct(): void {
    this.selectedProduct = this.loanProducts.find(
      (lp) => lp.loanCode === this.loanDetails.loanProductCode
    );
    if (this.selectedProduct) {
      this.loanDetailsFormGroup.controls['loanAmountCtrl'].reset();
      this.loanDetailsFormGroup.controls['loanAmountCtrl'].setValidators([
        ,
        Validators.required,
        Validators.max(this.selectedProduct.maxLoanAmount),
      ]);
      this.loanDetailsFormGroup.controls['loanTermCtrl'].reset();
      this.loanDetailsFormGroup.controls['loanTermCtrl'].setValidators([
        ,
        Validators.required,
        Validators.max(this.selectedProduct.maxLoanTermMonths),
      ]);
    }
  }

  checkLoan(): void {
    const { accountNumber } = this.data;
    const { amount, loanProductCode, term } = this.loanDetails;
    this.loanService
      .check(accountNumber, loanProductCode, amount, term)
      .subscribe((res) => {
        this.checkResult = {
          eligible: res !== false,
          riskResult: res !== false ? (res as RiskResult) : undefined,
        };
      });
  }

  takeLoan(): void {
    const { accountNumber } = this.data;
    const { amount, loanProductCode, term } = this.loanDetails;
    this.loanService
      .take(accountNumber, loanProductCode, amount, term)
      .subscribe((res) => {
        this.dialogRef.close(true);
      });
  }
}
