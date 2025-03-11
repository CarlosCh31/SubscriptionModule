import { TestBed } from '@angular/core/testing';

import { CyclingService } from './cycling.service';

describe('CyclingService', () => {
  let service: CyclingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyclingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
