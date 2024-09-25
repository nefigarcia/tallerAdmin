import { TestBed } from '@angular/core/testing';

import { AutozoneService } from './autozone.service';

describe('AutozoneService', () => {
  let service: AutozoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutozoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
