import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private claseEstudianteService: ClaseEstudianteService,
    private estudianteCursoService: EstudianteCursoService,
    private claseService: clasesService,
  ) { }

  estudiantes: EstudianteCurso[] = [];

  claseId: string | null = "";

  public clase: Clase | undefined;

  asistencias: any[] = [];

  asistenciasGet: any[] = [];

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
      if (elem.estudiante) {
        let asistencia: ClaseEstudiante = {
          clasesId: this.clase?.id,
          estudiantesId: elem.estudiante.id,
          asiste: this.asistencias.includes(elem.estudiante.id),
        };
        this.claseEstudianteService.postClaseEstudiante(asistencia).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);

          }
        );
        asistenciasaaa.push(asistencia);
      }
    })
    console.log(this.asistencias);
    console.log(asistenciasaaa);

  }

  asistio(idEstudiante: number): ClaseEstudiante {
    return this.asistenciasGet.find(asistencia => asistencia.estudiante.id === idEstudiante);
  }
}
