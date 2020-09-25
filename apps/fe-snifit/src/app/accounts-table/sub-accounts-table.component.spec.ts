import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountsTableComponent } from './sub-accounts-table.component';

describe('AccountsTableComponent', () => {
  let component: SubAccountsTableComponent;
  let fixture: ComponentFixture<SubAccountsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubAccountsTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
