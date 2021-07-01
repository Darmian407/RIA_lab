import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Calificacion } from 'src/app/model/Calificacion';
import { CalificacionEstudiante } from 'src/app/model/CalificacionEstudiante';
import { Curso } from 'src/app/model/Curso';
import { Estudiante } from 'src/app/model/Estudiante';
import { EstudianteCurso } from 'src/app/model/EstudianteCurso';
import { CalificacionEstudianteService } from 'src/app/services/calificacion-estudiante/calificacion-estudiante.service';
import { calificacionesService } from 'src/app/services/CalificacionesService/calificaciones.service';
import { CursoService } from 'src/app/services/CursoService/curso.service';
import { EstudianteCursoService } from 'src/app/services/EstudiantesCursoService/estudiante-curso.service';
import { estudianteService } from 'src/app/services/EstudianteService/estudiante.service';

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrls: ['./estudiantes-curso.component.css']
})
export class EstudiantesCursoComponent implements OnInit {

  cursoId: number | undefined;

  rol: string | undefined;

  estudiantesCurso: EstudianteCurso[] = [];

  displayAgregarEstudianteDialog: boolean = false;

  estudiantes: Estudiante[] = [];

  calificaciones: Calificacion[] = [];

  selectedEstudiante: Estudiante = {};

  agregarEstudianteForm: FormGroup = new FormGroup({});
  calificacion: Calificacion | undefined;
  maxCalificacion: number = 100;
  form: FormGroup = new FormGroup({});
  calificacionesGet: any[] = [];

  public clonedCalificaciones: CalificacionEstudiante[] = [];


  cols: any[] = [];

  constructor(
    private estudiantesCursoService: EstudianteCursoService,
    private route: ActivatedRoute,
    private estudiantesService: estudianteService,
    private calificacionService: calificacionesService,
    private calificacionEstudianteService: CalificacionEstudianteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  loadData() {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    const cursoId = Number(routeParams.get('cursoId'));

    this.cursoId = cursoId;

    let usuario = localStorage.getItem('user');
    if (typeof usuario === 'string') {
      let user = JSON.parse(usuario);
      if (user && user.roles) {
        this.rol = user.roles;
      }
    }

    // Form Agregar Estudiante al Curso
    this.agregarEstudianteForm = new FormGroup({
      estudiante: new FormControl('', [Validators.required]),
    });

    // Get todos los estudiantes
    if (this.rol?.includes('ADMIN')) this.estudiantesService.getEstudiantes().subscribe(
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

    // Get califcaciones de un curso
    if (this.rol?.includes('DOCENTE')) this.calificacionService.getCalificacionesCurso(cursoId).subscribe(
      result => {
        this.calificaciones = result;
      }
    );

  }

  ngOnInit(): void {
    this.loadData();

    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'segundoNombre', header: 'Segundo Nombre' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'segundoApellido', header: 'Segundo Apellido' },
    ];
  }

  ngOnSubmit(): void {
    let nuevoEstudiante = new EstudianteCurso()
    nuevoEstudiante.cursoId = this.cursoId;
    nuevoEstudiante.estudianteId = this.agregarEstudianteForm.controls.estudiante.value;

    this.estudiantesCursoService.postEstudiantesCurso(nuevoEstudiante).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estudiante agregado exitosamente' });
        this.loadData();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
    );

    this.displayAgregarEstudianteDialog = false;
  }

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar el estudiante del curso?',
      accept: () => {
        this.estudiantesCursoService.deleteEstudiantesCursoById(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estudiante eliminado exitosamente' });
            this.loadData();
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminado de estudiante del Curso cancelado' })
    });
  }

  showAgregarEstudianteDialog(): void {
    this.displayAgregarEstudianteDialog = true;
  }

  async ngOnSubmitCalificaciones() {
    for (let index = 0; index < this.estudiantesCurso.length; index++) {
      const elem = this.estudiantesCurso[index];

      try {
        if (elem.estudiante?.id && !this.calificado(elem.estudiante.id)) {

          let control = this.form.get(elem.estudiante?.id?.toString())
          let calificacionEstudiante: CalificacionEstudiante = {
            estudiantesId: elem.estudiante?.id,
            calificacionesId: Number(this.calificacion?.id),
            nota: control?.value,
          }

          await this.calificacionEstudianteService.postCalificacionEstudiante(calificacionEstudiante).toPromise();
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar califiaciones' });
      }

    }

    this.calificacionFunction({ value: this.calificacion?.id });
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificaciones agregadas exitosamente' });
  }

  calificacionFunction(e: any) {
    if (e.value != 0) {
      this.calificacionService.getCalificaciones(Number(e.value)).subscribe(
        response => {
          this.calificacion = response;
          if (response.ponderacion) {
            this.maxCalificacion = response.ponderacion;
          }
          if (this.calificacion?.cursosId) {
            this.form = new FormGroup({})
            this.estudiantesCurso.forEach(element => {
              if (element.estudiante?.id) {
                this.form.addControl(element.estudiante.id.toString(), new FormControl(Validators.required));
              }
            });
          }
          this.calificacionEstudianteService.getCalificacionEstudiantesCalificacion(this.calificacion?.id).subscribe(
            response => {
              this.calificacionesGet = response;
            },
            error => { }
          );
        },
        error => { },
      );
    }
  }

  calificado(idEstudiante: number | undefined) {
    return this.calificacionesGet.find(elem => elem.estudiante.id === idEstudiante)
  }

  onRowEditInit(estudiante: Estudiante, index: number) {
    this.clonedCalificaciones[index] = { ...this.calificado(estudiante.id) };
  }

  onRowEditSave(estudiante: Estudiante, index: number) {
    delete this.clonedCalificaciones[index];
    this.calificacionEstudianteService.putCalificacionEstudiante(this.calificado(estudiante.id)).subscribe(
      response => {
        this.calificacionFunction({ value: this.calificacion?.id });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificacion editada exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar califiaciones' });
      }
    )
  }

  onRowEditCancel(index: number, idEstudiante: number) {
    this.calificacionesGet[this.calificacionesGet.findIndex(elem => elem.estudiante.id === idEstudiante)] = this.clonedCalificaciones[index];
    delete this.clonedCalificaciones[index];
  }

  onDelete(idEstudiante: number) {
    this.confirmationService.confirm({
      message: 'Seguro que quiere eliminar la calificación?',
      accept: () => {
        let calificacionEst = this.calificacionesGet.find(calif => calif.estudiante.id === idEstudiante);
        this.calificacionEstudianteService.deleteCalificacionEstudiante(calificacionEst.id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificacion eliminada exitosamente' });
            this.calificacionFunction({ value: this.calificacion?.id });
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la Calificacion cancelada' })
    });
  }

  selccionarEstudiante(e: any) {
    let estudiante = this.estudiantes.find((elem) => {
      return elem.id === e.value;
    });
    
    if(estudiante) this.selectedEstudiante = estudiante;
    console.log(this.selectedEstudiante);
    
  }
}
