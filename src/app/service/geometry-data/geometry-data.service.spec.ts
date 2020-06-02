import { TestBed } from '@angular/core/testing';

import { GeometryDataService } from './geometry-data.service';

describe('GeometryDataService', () => {
  let service: GeometryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeometryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
