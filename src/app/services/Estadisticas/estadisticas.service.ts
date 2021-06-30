import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calificacion } from 'src/app/model/Calificacion';
import { CalificacionEstudiante } from 'src/app/model/CalificacionEstudiante';
import { Clase } from 'src/app/model/Clase';
import { ClaseEstudiante } from 'src/app/model/ClaseEstudiante';
import { EstadisticasCalificaciones } from 'src/app/model/EstadisticasCalificaciones';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  private URL = 'https://ldgr3.cristianbauza.com/api';

  constructor(private http: HttpClient) { }

  async getEstadisticasAsistencaCurso(idCurso: number) {
    let res = {
      asiste: 0,
      noAsiste: 0
    }

    let clases = await this.http.get<Clase[]>(`${this.URL}/Clases/Cursos/${idCurso}`).toPromise();

    for (let index = 0; index < clases.length; index++) {
      let element = clases[index];

      let clasesEstudiante = await this.http.get<ClaseEstudiante[]>(this.URL + '/ClaseEstudiantes/Clase/' + element.id).toPromise();

      clasesEstudiante.forEach(elem => {
        if(elem.asiste){
          res.asiste++
        } else {
          res.noAsiste++
        }
      });
    }

    return res;
  }

  async getEstadisticasCalificacionesCurso(idCurso: number) {
    let dataCalificaciones: EstadisticasCalificaciones = {
      labels: [],
      datasets: [],
    };

    let calificaciones = await this.http
      .get<Calificacion[]>(`${this.URL}/Calificaciones/Cursos/${idCurso}`)
      .toPromise();

    for (let index = 0; index < calificaciones.length; index++) {
      let element = calificaciones[index];

      dataCalificaciones.datasets.push({
        id: element.id,
        label: element.titulo,
        backgroundColor:
          '#' + Math.floor(Math.random() * 16777215).toString(16),
        data: [],
      });

      let calificacionesEstudiantes = await this.http
        .get<CalificacionEstudiante[]>(
          `${this.URL}/CalificacionEstudiantes/Calificacion/${element.id}`
        )
        .toPromise();

      calificacionesEstudiantes.forEach((calificacionEstudiante) => {
        if (calificacionEstudiante.estudiante?.documento) {
          if (
            !dataCalificaciones.labels.includes(
              calificacionEstudiante.estudiante.documento
            )
          ) {
            dataCalificaciones.labels.push(
              calificacionEstudiante.estudiante.documento
            );
          }
          let indice = dataCalificaciones.labels.indexOf(
            calificacionEstudiante.estudiante.documento
          );

          let cal = dataCalificaciones.datasets.find((aux) => {
            return aux.id === element.id;
          });

          if (cal && calificacionEstudiante.nota) {
            cal.data[indice] = calificacionEstudiante.nota;
          }
        }
      });
    }

    return dataCalificaciones;
  }
}