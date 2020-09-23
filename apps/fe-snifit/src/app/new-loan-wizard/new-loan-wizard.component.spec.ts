import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoanWizardComponent } from './new-loan-wizard.component';

describe('NewLoanWizardComponent', () => {
  let component: NewLoanWizardComponent;
  let fixture: ComponentFixture<NewLoanWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewLoanWizardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoanWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
