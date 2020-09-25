import { Component, OnInit, Input } from '@angular/core';
import { PartialLoanDto } from '@mataf-poc/ods-mongoose';

@Component({
  selector: 'loans-table',
  templateUrl: './loans-table.component.html',
  styleUrls: ['./loans-table.component.scss'],
})
export class LoansTableComponent implements OnInit {
  @Input() loans: PartialLoanDto[];

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

  constructor() {}

  ngOnInit(): void {}
}
