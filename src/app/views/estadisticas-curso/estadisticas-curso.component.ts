import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalificacionEstudianteService } from 'src/app/services/calificacion-estudiante/calificacion-estudiante.service';
import { calificacionesService } from 'src/app/services/CalificacionesService/calificaciones.service';
import { ClaseEstudianteService } from 'src/app/services/ClaseEstudainteService/clase-estudiante.service';
import { clasesService } from 'src/app/services/ClasesService/clases.service';
import { EstadisticasService } from 'src/app/services/Estadisticas/estadisticas.service';

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
    private estadisticasService: EstadisticasService
  ) {}

  cursoId: any;
  dataAsistencia: any;
  dataCalificaciones: any;
  optionsAsistencia: any;
  optionsCalificaciones: any;

  asiste = 0;
  noAsiste = 0;

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
                clasesEstudiantes.forEach((elem) => {
                  elem.asiste ? this.asiste++ : this.noAsiste++;
                });

                this.optionsAsistencia = {
                  title: {
                    display: true,
                    text: `${
                      (this.asiste * 100) / (this.asiste + this.noAsiste)
                    }%`,
                    fontSize: 25,
                  },
                };

                this.dataAsistencia = {
                  labels: ['Asiste', 'No Asiste'],
                  datasets: [
                    {
                      data: [this.asiste, this.noAsiste],
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
    this.estadisticasService
      .getEstadisticasCalificacionesCurso(idCurso)
      .then((res) => (this.dataCalificaciones = res));
  }
}
