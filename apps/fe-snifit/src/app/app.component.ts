import { Component } from '@angular/core';
import { PartnerService } from '../core/services/partner.service';
import { PartialAccountDto } from '@mataf-poc/ods-mongoose';

@Component({
  selector: 'mataf-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PartnerService],
})
export class AppComponent {
  public partnerId: string = '';
  public isLoadingAccounts = false;
  public accountList: PartialAccountDto[];

  constructor(private accountService: PartnerService) {}

  public handleSearchPartnerClicked(): void {
    this.isLoadingAccounts = true;

    this.accountService
      .getPartnerAccounts(this.partnerId)
      .toPromise()
      .then((res) => {
        this.isLoadingAccounts = false;
        this.accountList = res.docs;
      })
      .catch(() => {
        this.isLoadingAccounts = false;
      });
  }
}
