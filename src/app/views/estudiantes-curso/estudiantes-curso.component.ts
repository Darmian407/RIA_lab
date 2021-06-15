import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstudianteCursoService } from 'src/app/services/EstudiantesCursoService/estudiante-curso.service';

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrls: ['./estudiantes-curso.component.css']
})
export class EstudiantesCursoComponent implements OnInit {

  estudiantes_curso: [] = [];

  displayAgregarEstudianteDialog: boolean = false;

  estudiantes: [] = [];
  selectedEstudiante: any ;

  agregarEstudianteForm: FormGroup = new FormGroup({});

  constructor(private estudiantesCursoService: EstudianteCursoService) { }

  ngOnInit(): void {
    this.agregarEstudianteForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });
    // this.estudiantesCursoService.getEstudiantesCurso().subscribe();
  }

  ngOnSubmit(): void {
    
  }

  ngOnDelete(id: number): void {
    this.estudiantesCursoService.deleteEstudiantesCursoById(id);
  }

  showAgregarEstudianteDialog(): void {
    this.displayAgregarEstudianteDialog = true;
  }
}
