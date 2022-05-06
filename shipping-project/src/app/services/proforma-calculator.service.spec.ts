import { TestBed } from '@angular/core/testing';

import { ProformaCalculatorService } from './proforma-calculator.service';

describe('ProformaCalculatorService', () => {
  let service: ProformaCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProformaCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
