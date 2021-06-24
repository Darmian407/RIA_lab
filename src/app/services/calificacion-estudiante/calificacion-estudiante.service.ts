import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalificacionEstudiante } from 'src/app/model/CalificacionEstudiante';

@Injectable({
  providedIn: 'root'
})
export class CalificacionEstudianteService {
  private URL = 'https://ldgr3.cristianbauza.com/api/CalificacionEstudiantes';

  constructor(private http: HttpClient) { }

  getCalificacionEstudiantesCalificacion(calificacionId: number|undefined) {
    return this.http.get<CalificacionEstudiante[]>(this.URL+'/Calificacion/'+ calificacionId);
  }

  postCalificacionEstudiante(calificacionEstudiante: CalificacionEstudiante) {
    return this.http.post(this.URL, calificacionEstudiante);
  }

  getCalificacionEstudiante(idCalificacionEstudiante: string) {
    return this.http.get(this.URL + "/" + idCalificacionEstudiante);
  }

  putCalificacionEstudiante(calificacionEstudiante: CalificacionEstudiante) {
    return this.http.put(this.URL+"/"+calificacionEstudiante.id, calificacionEstudiante);
  }

  deleteCalificacionEstudiante(idCalificacionEstudiante: string) {
    return this.http.delete(this.URL + "/" + idCalificacionEstudiante);
  }
}
