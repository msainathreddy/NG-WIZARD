import { TestBed } from '@angular/core/testing';

import { SummonService } from './summon.service';

describe('SummonService', () => {
  let service: SummonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
