import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCursoComponent } from './estadisticas-curso.component';

describe('EstadisticasCursoComponent', () => {
  let component: EstadisticasCursoComponent;
  let fixture: ComponentFixture<EstadisticasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
