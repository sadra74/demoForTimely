import { TestBed } from '@angular/core/testing';

import { DtService } from './dt.service';

describe('DtService', () => {
  let service: DtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
