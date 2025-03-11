import { TestBed } from '@angular/core/testing';

import { GlobalRegionService } from './global-region.service';

describe('GlobalRegionService', () => {
  let service: GlobalRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
