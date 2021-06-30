import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { zip } from 'rxjs';
import { Calificacion } from 'src/app/model/Calificacion';
import { CalificacionEstudiante } from 'src/app/model/CalificacionEstudiante';
import { Clase } from 'src/app/model/Clase';
import { ClaseEstudiante } from 'src/app/model/ClaseEstudiante';
import { EstudianteCurso } from 'src/app/model/EstudianteCurso';
import { CalificacionEstudianteService } from 'src/app/services/calificacion-estudiante/calificacion-estudiante.service';
import { calificacionesService } from 'src/app/services/CalificacionesService/calificaciones.service';
import { ClaseEstudianteService } from 'src/app/services/ClaseEstudainteService/clase-estudiante.service';
import { clasesService } from 'src/app/services/ClasesService/clases.service';
import { EstudianteCursoService } from 'src/app/services/EstudiantesCursoService/estudiante-curso.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { Estudiante } from 'src/app/model/Estudiante';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  public clonedCalificaciones: CalificacionEstudiante[] = [];

  constructor(
    private estudianteCursoService: EstudianteCursoService,
    private calificacionService: calificacionesService,
    private calificacionEstudianteService: CalificacionEstudianteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
  ) { }

  estudiantes: EstudianteCurso[] = [];

  calificacionId: string | null = "";

  calificacion: Calificacion | undefined;
  maxCalificacion: number = 100;

  calificacionesGet: any[] = [];

  form: FormGroup = new FormGroup({});

  cols: any[] = [];


  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.calificacionId = routeParams.get('calificacionId');

    this.getCalificaciones();

    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'segundoApellido', header: 'Segundo Apellido' },
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'segundoNombre', header: 'Segundo Nombre' },
    ];
  }

  getCalificaciones() {
    if (this.calificacionId) {
      this.calificacionService.getCalificaciones(Number(this.calificacionId)).subscribe(
        response => {
          this.calificacion = response;
          if (response.ponderacion) {
            this.maxCalificacion = response.ponderacion;
          }
          if (this.calificacion?.cursosId) {
            this.estudianteCursoService.getEstudiantesCurso(this.calificacion?.cursosId).subscribe(
              response => {
                response.forEach(element => {
                  if (element.estudiante?.id) {
                    this.form.addControl(element.estudiante.id.toString(), new FormControl(Validators.required));
                  }
                });
                this.estudiantes = response;
              },
              error => { }
            );
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

  async ngOnSubmit() {
    for (let index = 0; index < this.estudiantes.length; index++) {
      const elem = this.estudiantes[index];

      try {
        if (elem.estudiante?.id && !this.calificado(elem.estudiante.id)) {

          let control = this.form.get(elem.estudiante?.id?.toString())
          let calificacionEstudiante: CalificacionEstudiante = {
            estudiantesId: elem.estudiante?.id,
            calificacionesId: Number(this.calificacionId),
            nota: control?.value,
          }

          await this.calificacionEstudianteService.postCalificacionEstudiante(calificacionEstudiante).toPromise();
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar califiaciones' });
      }

    }
    this.getCalificaciones();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificaciones agregadas exitosamente' });
  }

  onRowEditInit(estudiante: Estudiante, index: number) {
    this.clonedCalificaciones[index] = { ...this.calificado(estudiante.id) };
  }

  onRowEditSave(estudiante: Estudiante, index: number) {
    delete this.clonedCalificaciones[index];
    this.calificacionEstudianteService.putCalificacionEstudiante(this.calificado(estudiante.id)).subscribe(
      response => {
        this.getCalificaciones();
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
            this.getCalificaciones();
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la Calificacion cancelada' })
    });
  }
}
