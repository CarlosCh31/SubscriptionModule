import { TestBed } from '@angular/core/testing';

import { SwimmingService } from './swimming.service';

describe('SwimmingService', () => {
  let service: SwimmingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwimmingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
