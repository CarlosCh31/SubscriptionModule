import { TestBed } from '@angular/core/testing';

import { LateralityService } from './laterality.service';

describe('LateralityService', () => {
  let service: LateralityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LateralityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
