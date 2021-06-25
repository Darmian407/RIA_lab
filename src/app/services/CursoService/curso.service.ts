import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Curso } from '../../model/Curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private URL = 'https://ldgr3.cristianbauza.com/api/Cursos';

  constructor(private http: HttpClient) {}

  getCursos() {
    return this.http.get<Curso[]>(this.URL);
  }

  getMisCursos() {
    return this.http.get<Curso[]>(this.URL + '/MisCursos');
  }

  postCurso(curso: Curso) {
    return this.http.post(this.URL, curso);
  }
  
  getCurso(idCurso: string) {
    return this.http.get(this.URL + '/' + idCurso);
  }

  putCurso(curso: Curso) {
    return this.http.put(this.URL+"/"+curso.id, curso);
  }

  deleteCurso(idCurso: string) {
    return this.http.delete(this.URL + '/' + idCurso);
  }
}
