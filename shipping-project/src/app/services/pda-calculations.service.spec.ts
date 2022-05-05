import { TestBed } from '@angular/core/testing';

import { PdaCalculationsService } from './pda-calculations.service';

describe('PdaCalculationsService', () => {
  let service: PdaCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdaCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
