import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalificacionEstudianteService } from 'src/app/services/calificacion-estudiante/calificacion-estudiante.service';
import { calificacionesService } from 'src/app/services/CalificacionesService/calificaciones.service';
import { ClaseEstudianteService } from 'src/app/services/ClaseEstudainteService/clase-estudiante.service';
import { clasesService } from 'src/app/services/ClasesService/clases.service';

@Component({
  selector: 'app-estadisticas-curso',
  templateUrl: './estadisticas-curso.component.html',
  styleUrls: ['./estadisticas-curso.component.css'],
})
export class EstadisticasCursoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private claseEstudianteService: ClaseEstudianteService,
    private claseService: clasesService,
    private calificacionesService: calificacionesService,
    private calificacionesEstudianteService: CalificacionEstudianteService
  ) { }

  cursoId: any;
  dataAsistencia: any;
  dataCalificaciones: any;
  optionsAsistencia: any;
  optionsCalificaciones: any;

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.cursoId = id;

    this.getAsistenciasCurso(id);
    this.getCalificacionesCurso(id);
  }

  private getAsistenciasCurso(idCurso: number) {
    this.claseService.getClasesCurso(idCurso).subscribe(
      (clases) => {
        clases.forEach((elem) => {
          this.claseEstudianteService
            .getClaseEstudiantesClase(elem.id)
            .subscribe(
              (clasesEstudiantes) => {
                let asiste = 0;
                let noAsiste = 0;

                clasesEstudiantes.forEach((elem) => {
                  elem.asiste ? asiste++ : noAsiste++;
                });

                this.optionsAsistencia = {
                  title: {
                    display: true,
                    text: `${(asiste * 100) / (asiste + noAsiste)}%`,
                    fontSize: 25,
                  },
                };

                this.dataAsistencia = {
                  labels: ['Asiste', 'No Asiste'],
                  datasets: [
                    {
                      data: [asiste, noAsiste],
                      backgroundColor: ['#FF6384', '#36A2EB'],
                      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                    },
                  ],
                };
              },
              (err) => console.log(err)
            );
        });
      },
      (err) => console.log(err)
    );
  }

  private getCalificacionesCurso(idCurso: number) {
    this.calificacionesService.getCalificacionesCurso(idCurso).subscribe(
      (calificaciones) => {
        calificaciones.forEach((calificacion) => {
          this.calificacionesEstudianteService
            .getCalificacionEstudiantesCalificacion(calificacion.id)
            .subscribe(
              (calificacionesEstudiante) => {
                calificacionesEstudiante.forEach((elem) => {
                  console.log(elem)
                });
              },
              (err) => console.log(err)
            );
        });
      },
      (err) => console.log(err)
    );
  }
}
