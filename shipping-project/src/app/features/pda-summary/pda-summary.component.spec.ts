import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdaSummaryComponent } from './pda-summary.component';

describe('PdaSummaryComponent', () => {
  let component: PdaSummaryComponent;
  let fixture: ComponentFixture<PdaSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdaSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
