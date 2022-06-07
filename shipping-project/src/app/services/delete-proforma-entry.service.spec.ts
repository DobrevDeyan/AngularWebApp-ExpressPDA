import { TestBed } from '@angular/core/testing';

import { DeleteProformaEntryService } from './delete-proforma-entry.service';

describe('DeleteProformaEntryService', () => {
  let service: DeleteProformaEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteProformaEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
