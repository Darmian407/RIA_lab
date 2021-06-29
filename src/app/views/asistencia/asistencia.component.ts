import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Clase } from 'src/app/model/Clase';
import { ClaseEstudiante } from 'src/app/model/ClaseEstudiante';
import { EstudianteCurso } from 'src/app/model/EstudianteCurso';
import { ClaseEstudianteService } from 'src/app/services/ClaseEstudainteService/clase-estudiante.service';
import { clasesService } from 'src/app/services/ClasesService/clases.service';
import { EstudianteCursoService } from 'src/app/services/EstudiantesCursoService/estudiante-curso.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  constructor(
    private claseEstudianteService: ClaseEstudianteService,
    private estudianteCursoService: EstudianteCursoService,
    private claseService: clasesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
  ) { }

  estudiantes: EstudianteCurso[] = [];

  claseId: string | null = "";

  public clase: Clase | undefined;

  asistencias: any[] = [];

  asistenciasGet: any[] = [];

  cols: any[] = [];

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.claseId = routeParams.get('claseId');
    
    if (this.claseId) {
      this.claseService.getClase(this.claseId).subscribe(
        response => {
          this.clase = response; 
          if (this.clase?.cursosId) {
            this.estudianteCursoService.getEstudiantesCurso(this.clase?.cursosId).subscribe(
              response => {
                this.estudiantes = response;
              },
              error => {
      
              }
            );
          }
          this.claseEstudianteService.getClaseEstudiantesClase(this.clase?.id).subscribe(
            response => {
              this.asistenciasGet = response;
            },
            error => {
      
            }
          );
        },
        error => {
         },
      );
    }

    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'segundoApellido', header: 'Segundo Apellido' },
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'segundoNombre', header: 'Segundo Nombre' },
      
      
  ];
    
  }

  onCheckboxChange(e: any) {

    if (e.target.checked) {
      this.asistencias.push(Number(e.target.value));
    } else {
      const index = this.asistencias.findIndex(x => x.value === e.target.value);
      this.asistencias.splice(index, 1)
    }
  }

  onSubmit() {
    let asistenciasaaa: ClaseEstudiante[] = [];
    this.estudiantes.forEach(elem => {
      if (elem.estudiante &&elem.estudiante.id && !this.asistio(elem.estudiante.id)) {
        let asistencia: ClaseEstudiante = {
          clasesId: this.clase?.id,
          estudiantesId: elem.estudiante.id,
          asiste: this.asistencias.includes(elem.estudiante.id),
        };
        this.claseEstudianteService.postClaseEstudiante(asistencia).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asistencia pasada correctamente' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });

          }
        );
          
      }
    })
  }

  asistio(idEstudiante: number): ClaseEstudiante | undefined {
    return this.asistenciasGet.find(asistencia => asistencia.estudiante.id === idEstudiante);
  }

  onEdit(idEstudiante: number){
    this.confirmationService.confirm({
      message: 'Seguro que quiere cambiar la asistencia?',
      accept: () => {
        let asistencia = this.asistenciasGet.find(asistencia => asistencia.estudiante.id === idEstudiante);
        asistencia.asiste = !asistencia.asiste;
        this.claseEstudianteService.putClaseEstudiante(asistencia).subscribe(
          result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asistencia editada exitosamente' }),
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }) 
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Edicion de la asistencia cancelada' })
    });
  }

  onDelete(idEstudiante: number){
    this.confirmationService.confirm({
      message: 'Seguro que quiere eliminar la asistencia?',
      accept: () => {
        let asistencia = this.asistenciasGet.find(asistencia => asistencia.estudiante.id === idEstudiante);
        this.claseEstudianteService.deleteClaseEstudiante(asistencia.id).subscribe(
          result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asistencia eliminada exitosamente' }),
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }) 
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la asistencia cancelada' })
    });
  }
}
