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
    private estadisticasService: EstadisticasService
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
    this.estadisticasService.getEstadisticasAsistencaCurso(idCurso).then(res => {
      let { asiste, noAsiste } = res;

      this.optionsAsistencia = {
        title: {
          display: true,
          text: `${asiste > 0 ? Math.round((asiste * 100) / (asiste + noAsiste)) : 0}%`,
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
    });
  }

  private getCalificacionesCurso(idCurso: number) {
    this.estadisticasService
      .getEstadisticasCalificacionesCurso(idCurso)
      .then((res) => {
        this.dataCalificaciones = res;
        if (res.datasets.length == 0) {
          this.optionsCalificaciones = {
            title: {
              display: true,
              text: 'No hay datos',
              fontSize: 15,
            },
          };
        }
      });
  }
}
