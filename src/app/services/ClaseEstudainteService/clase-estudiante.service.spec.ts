import { TestBed } from '@angular/core/testing';

import { ClaseEstudianteService } from './clase-estudiante.service';

describe('ClaseEstudianteService', () => {
  let service: ClaseEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
