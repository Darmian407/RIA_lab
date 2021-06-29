import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Curso } from 'src/app/model/Curso';
import { Estudiante } from 'src/app/model/Estudiante';
import { EstudianteCurso } from 'src/app/model/EstudianteCurso';
import { CursoService } from 'src/app/services/CursoService/curso.service';
import { EstudianteCursoService } from 'src/app/services/EstudiantesCursoService/estudiante-curso.service';
import { estudianteService } from 'src/app/services/EstudianteService/estudiante.service';

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrls: ['./estudiantes-curso.component.css']
})
export class EstudiantesCursoComponent implements OnInit {

  curso: Curso = {};

  rol: string | undefined;

  estudiantesCurso: EstudianteCurso[] = [];

  displayAgregarEstudianteDialog: boolean = false;

  estudiantes: Estudiante[] = [];

  selectedEstudiante: Estudiante = {};

  agregarEstudianteForm: FormGroup = new FormGroup({});

  cols: any[] = [];

  constructor(
    private estudiantesCursoService: EstudianteCursoService,
    private route: ActivatedRoute,
    private estudiantesService: estudianteService,
    private cursosService: CursoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    const cursoId = Number(routeParams.get('cursoId'));

    // Get datos del curso
    this.cursosService.getCurso(cursoId.toString()).subscribe(
      result => {
        this.curso = result;
      }
    );

    // Form Agregar Estudiante al Curso
    this.agregarEstudianteForm = new FormGroup({
      estudiante: new FormControl('', [Validators.required]),
    });

    // Get todos los estudiantes
    this.estudiantesService.getEstudiantes().subscribe(
      result => {
        this.estudiantes = result;
      }
    );

    // Get Estudiantes del curso
    this.estudiantesCursoService.getEstudiantesCurso(cursoId).subscribe(
      result => {
        this.estudiantesCurso = result;
      }
    );

    let usuario = localStorage.getItem('user');
    if (typeof usuario === 'string') {
      let user = JSON.parse(usuario);
      if (user && user.roles) {
        this.rol = user.roles;
      }
    }

    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'segundoApellido', header: 'Segundo Apellido' },
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'segundoNombre', header: 'Segundo Nombre' },
      
  ];
  }

  ngOnSubmit(): void {
    let nuevoEstudiante = new EstudianteCurso()
    nuevoEstudiante.cursoId = this.curso.id;
    nuevoEstudiante.estudianteId = this.agregarEstudianteForm.controls.estudiante.value;

    this.estudiantesCursoService.postEstudiantesCurso(nuevoEstudiante).subscribe(
      result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estudiante agregado exitosamente' }),
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
    );

    this.displayAgregarEstudianteDialog = false;
  }

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar el estudiante del curso?',
      accept: () => {
        this.estudiantesCursoService.deleteEstudiantesCursoById(id).subscribe(
          result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estudiante eliminado exitosamente' }),
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminado de estudiante del Curso cancelado' })
    });
  }

  showAgregarEstudianteDialog(): void {
    this.displayAgregarEstudianteDialog = true;
  }
}
