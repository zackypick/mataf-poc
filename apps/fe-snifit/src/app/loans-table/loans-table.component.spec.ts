import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansTableComponent } from './loans-table.component';

describe('LoansTableComponent', () => {
  let component: LoansTableComponent;
  let fixture: ComponentFixture<LoansTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoansTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
