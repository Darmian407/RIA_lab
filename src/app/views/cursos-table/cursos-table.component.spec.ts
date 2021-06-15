import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosTableComponent } from './cursos-table.component';

describe('CursosTableComponent', () => {
  let component: CursosTableComponent;
  let fixture: ComponentFixture<CursosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
