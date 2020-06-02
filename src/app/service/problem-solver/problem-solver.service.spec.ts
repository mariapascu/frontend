import { TestBed } from '@angular/core/testing';

import { ProblemSolverService } from './problem-solver.service';

describe('ProblemSolverService', () => {
  let service: ProblemSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
