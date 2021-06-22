import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Clase } from 'src/app/model/Clase';

@Injectable({
  providedIn: 'root'
})
export class clasesService {

  private URL = 'https://ldgr3.cristianbauza.com/api/Clases';

  public clases: Clase[] = [];

  constructor(private http: HttpClient) { }

  getClasesCurso(idCurso: number){

    return this.http.get<Clase[]>(`${this.URL}/Cursos/${idCurso}`);

  }

  getClases() {

    return this.http.get<Clase[]>(this.URL);

  }

  postClases(clase: Clase) {

    return this.http.post(this.URL, clase);

  }

  getClase(idClase: string) {

    return this.http.get(`${this.URL}/${idClase}`);

  }

  putClase(clase: Clase) {

    return this.http.put(`${this.URL}/${clase.id}`, clase);

  }

  deleteClase(idClase: number) {

    return this.http.delete(`${this.URL}/${idClase}`);
  
  }


}