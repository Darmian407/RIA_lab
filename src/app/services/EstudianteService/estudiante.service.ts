import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Estudiante } from '../../model/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class estudianteService {

  private URL = 'https://ldgr3.cristianbauza.com/api/Estudiantes';

  public estudiantes: any;

  constructor(private http: HttpClient) { }

  getEstudiantes() {

    return this.http.get<Estudiante[]>(this.URL);

  }

  getEstudiantesPaging(index: number,nombre:string,apellido:string,cedula:string){
    return this.http.get<{lista: Estudiante[], size: number}>(`${this.URL}/api/Estudiantes/Paging?size=10&index=${index}${nombre}${apellido}${cedula}`);
  }
  
  postEstudiantes(estudiante: Estudiante) {

    return this.http.post(this.URL, estudiante);

  }

  getEstudiante(idEstudiante: string) {

    return this.http.get(`${this.URL}/${idEstudiante}`);

  }

  putEstudiante(estudiante: Estudiante) {

    return this.http.put(`${this.URL}/${estudiante.id}`, estudiante);

  }

  deleteEstudiante(idEstudiante: string) {

    return this.http.delete(`${this.URL}/${idEstudiante}`);
  
  }


}
