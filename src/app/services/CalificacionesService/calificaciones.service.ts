import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Calificacion } from 'src/app/model/Calificacion';

@Injectable({
  providedIn: 'root'
})
export class calificacionesService {

  private URL = 'https://ldgr3.cristianbauza.com/api/Calificaciones';

  public calificaciones: Calificacion[] = [];

  constructor(private http: HttpClient) { }

  getCalificacionesCurso(idCurso: number){
    return this.http.get<Calificacion[]>(`${this.URL}/Cursos/${idCurso}`);
  }

  getCalificaciones(id: number) {
    return this.http.get<Calificacion[]>(`${this.URL}/${id}`);
  }

  putCalificaciones(calificacion: Calificacion) {
    return this.http.put(`${this.URL}/${calificacion.id}`, calificacion);
  }

  deleteCalificaciones(idCalificacion: number) {
    return this.http.delete(`${this.URL}/${idCalificacion}`);
  }

  postCalificaciones(calificacion: Calificacion) {
    return this.http.post(this.URL, calificacion);
  }

}