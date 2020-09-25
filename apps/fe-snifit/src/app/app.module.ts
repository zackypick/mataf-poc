import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@mataf-poc/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PartnerAccountDetailsComponent } from './partner-account-details/partner-account-details.component';
import { NewLoanWizardComponent } from './new-loan-wizard/new-loan-wizard.component';
import { SubAccountsTableComponent } from './accounts-table/sub-accounts-table.component';
import { LoansTableComponent } from './loans-table/loans-table.component';
import { AccountLoansPipe } from '../core/pipes/account-loans.pipe';

@NgModule({
  id: 'app-module',
  declarations: [
    AppComponent,
    PartnerAccountDetailsComponent,
    NewLoanWizardComponent,
    SubAccountsTableComponent,
    LoansTableComponent,
    AccountLoansPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
