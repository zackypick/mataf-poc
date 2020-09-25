import { Component, OnInit, Input } from '@angular/core';
import { PartialSubAccountDto } from '@mataf-poc/ods-mongoose';

@Component({
  selector: 'sub-accounts-table',
  templateUrl: './sub-accounts-table.component.html',
  styleUrls: ['./sub-accounts-table.component.scss'],
})
export class SubAccountsTableComponent implements OnInit {
  @Input() subAccounts: PartialSubAccountDto[];

  public subAccountsColumns: string[] = [
    'number',
    'code',
    'type',
    'currentBalance',
    'valueDate',
  ];

  constructor() {}

  ngOnInit(): void {}
}
