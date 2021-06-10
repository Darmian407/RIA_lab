import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Curso } from '../model/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private URL = 'https://ldgr3.cristianbauza.com/api/Cursos';

  constructor(private http: HttpClient) { }

  getCursos(){

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.get<Curso[]>(this.URL, { headers: headers });
      }
    }
    throw Observable;

  }

  postCurso(curso: Curso) {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.post(this.URL, curso, { headers: headers });
      }
    }
    throw Observable;

  }
  getCurso(idCurso: string) {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.get(this.URL + "/" + idCurso, { headers: headers });
      }
    }
    return []

  }
  putCurso(curso: Curso) {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.put(this.URL, { headers: headers });
      }
    }
    return []

  }

  deleteCurso(idCurso: string) {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.delete(this.URL + "/" + idCurso, { headers: headers });
      }
    }
    return []

  }
}
