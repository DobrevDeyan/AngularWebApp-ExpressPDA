import { TestBed } from '@angular/core/testing';

import { ImportUserProformasService } from './import-user-proformas.service';

describe('ImportUserProformasService', () => {
  let service: ImportUserProformasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportUserProformasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
