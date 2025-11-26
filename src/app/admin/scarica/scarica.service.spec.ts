import { TestBed } from '@angular/core/testing';

import { ScaricaService } from './scarica.service';

describe('ScaricaService', () => {
  let service: ScaricaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScaricaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
