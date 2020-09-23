import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanProductService } from '../../core/services/loan-product.service';
import { PartialLoanProductDto } from '@mataf-poc/ods-mongoose';

export interface NewLoanAccountData {
  accountNumber: string;
  creditScore: number;
}

@Component({
  selector: 'mataf-poc-new-loan-wizard',
  templateUrl: './new-loan-wizard.component.html',
  styleUrls: ['./new-loan-wizard.component.scss'],
  providers: [LoanProductService],
})
export class NewLoanWizardComponent implements OnInit {
  public loanProductFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  public selectedProduct: string;

  public loanProducts: PartialLoanProductDto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewLoanAccountData,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewLoanWizardComponent>,
    private loanProductService: LoanProductService
  ) {}

  ngOnInit() {
    this.loanProductFormGroup = this.formBuilder.group({
      loanProductCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.loanProductService.getLoanProducts().subscribe((res) => {
      this.loanProducts = res.filter(
        (p) => this.data.creditScore >= p.creditScoreLimit
      );
    });
  }
}
