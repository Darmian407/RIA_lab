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

  public estudiantes: Estudiante[] = [];

  constructor(private http: HttpClient) { }

  getEstudiantes() {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.get<Estudiante[]>(this.URL, { headers: headers });
      }
    }
    throw Observable;

  }

  postEstudiantes(estudiante: Estudiante) {

    let auth = localStorage.getItem('auth');

    console.log(estudiante);
    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (token) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        return this.http.post(this.URL, estudiante, { headers: headers });
      }
    }
    throw new Observable

  }

  getEstudiante(idEstudiante: string) {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ${token}');

        return this.http.get(this.URL, { headers: headers });
      }
    }
    return []

  }

  putEstudiante(estudiante: Estudiante) {

    return this.http.put(`${this.URL}/${estudiante.id}`, estudiante);

  }

  deleteEstudiante(idEstudiante: string) {

    let auth = localStorage.getItem('auth');

    if (typeof auth === 'string') {
      let token = JSON.parse(auth).token;
      if (auth) {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ${token}');

        return this.http.delete(`${this.URL}/${idEstudiante}`, { headers: headers });
      }
    }
    throw new Observable

  }


}
