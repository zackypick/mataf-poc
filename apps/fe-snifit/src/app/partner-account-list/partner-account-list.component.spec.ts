import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAccountListComponent } from './partner-account-list.component';

describe('PartnersAccountsListComponent', () => {
  let component: PartnerAccountListComponent;
  let fixture: ComponentFixture<PartnerAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerAccountListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
