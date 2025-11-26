import { TestBed } from '@angular/core/testing';

import { DirettaService } from './diretta.service';

describe('DirettaService', () => {
  let service: DirettaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirettaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
