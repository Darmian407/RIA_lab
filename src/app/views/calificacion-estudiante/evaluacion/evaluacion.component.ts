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

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

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

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.calificacionId = routeParams.get('calificacionId');

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
                console.log(this.form);
                this.estudiantes = response;
              },
              error => {

              }
            );
          }
          this.calificacionEstudianteService.getCalificacionEstudiantesCalificacion(this.calificacion?.id).subscribe(
            response => {
              this.calificacionesGet = response;


            },
            error => {

            }
          );
        },
        error => {
        },
      );
    }
  }

  calificado(idEstudiante: number) {
    return this.calificacionesGet.find(elem => elem.estudiante.id === idEstudiante)
  }

  ngOnSubmit() {
    this.estudiantes.forEach(elem => {
      if (elem.estudiante?.id&&!this.calificado(elem.estudiante.id)) {

        let control = this.form.get(elem.estudiante?.id?.toString())
        console.log(control?.value);
        let calificacionEstudiante: CalificacionEstudiante = {
          estudiantesId: elem.estudiante?.id,
          calificacionesId: Number(this.calificacionId),
          nota: control?.value,
        }

        this.calificacionEstudianteService.postCalificacionEstudiante(calificacionEstudiante).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificaciones agregadas exitosamente' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar califiaciones' });
          }
        )

      

      }
    });
  }


  // onEdit(idEstudiante: number){
  //   this.confirmationService.confirm({
  //     message: 'Seguro que quiere cambiar la asistencia?',
  //     accept: () => {
  //       let asistencia = this.asistenciasGet.find(asistencia => asistencia.estudiante.id === idEstudiante);
  //       asistencia.asiste = !asistencia.asiste;
  //       this.claseEstudianteService.putClaseEstudiante(asistencia).subscribe(
  //         result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asistencia editada exitosamente' }),
  //         error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }) 
  //       );
  //     },
  //     reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Edicion de la asistencia cancelada' })
  //   });
  // }

  onDelete(idEstudiante: number) {
    this.confirmationService.confirm({
      message: 'Seguro que quiere eliminar la asistencia?',
      accept: () => {
        let calificacionEst = this.calificacionesGet.find(calif => calif.estudiante.id === idEstudiante);
        this.calificacionEstudianteService.deleteCalificacionEstudiante(calificacionEst.id).subscribe(
          result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificacion eliminada exitosamente' }),
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la Calificacion cancelada' })
    });
  }
}
