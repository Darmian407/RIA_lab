import { TestBed } from '@angular/core/testing';

import { CalificacionEstudianteService } from './calificacion-estudiante.service';

describe('CalificacionEstudianteService', () => {
  let service: CalificacionEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
