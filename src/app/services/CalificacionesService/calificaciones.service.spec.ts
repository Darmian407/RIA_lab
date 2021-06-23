import { TestBed } from '@angular/core/testing';

import { calificacionesService } from './calificaciones.service';

describe('calificacionesService', () => {
  let service: calificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(calificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
