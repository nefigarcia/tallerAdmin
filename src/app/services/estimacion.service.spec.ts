import { TestBed } from '@angular/core/testing';

import { EstimacionService } from './estimacion.service';

describe('EstimacionService', () => {
  let service: EstimacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
