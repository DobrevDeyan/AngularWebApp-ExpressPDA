import { TestBed } from '@angular/core/testing';

import { ExportUserProformasService } from './export-user-proformas.service';

describe('ExportUserProformasService', () => {
  let service: ExportUserProformasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportUserProformasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
