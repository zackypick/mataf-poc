import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@mataf-poc/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PartnerAccountListComponent } from './partner-account-list/partner-account-list.component';
import { NewLoanWizardComponent } from './new-loan-wizard/new-loan-wizard.component';

@NgModule({
  id: 'app-module',
  declarations: [
    AppComponent,
    PartnerAccountListComponent,
    NewLoanWizardComponent,
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
