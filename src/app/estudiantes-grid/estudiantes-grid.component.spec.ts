import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesGridComponent } from './estudiantes-grid.component';

describe('EstudiantesGridComponent', () => {
  let component: EstudiantesGridComponent;
  let fixture: ComponentFixture<EstudiantesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
