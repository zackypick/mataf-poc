import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAccountDetailsComponent } from './partner-account-details.component';

describe('PartnersAccountsListComponent', () => {
  let component: PartnerAccountDetailsComponent;
  let fixture: ComponentFixture<PartnerAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerAccountDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
