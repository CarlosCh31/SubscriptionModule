import { TestBed } from '@angular/core/testing';

import { DisabilityTypeService } from './disability-type.service';

describe('DisabilityTypeService', () => {
  let service: DisabilityTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisabilityTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
