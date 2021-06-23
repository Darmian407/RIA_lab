import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaseEstudiante } from 'src/app/model/ClaseEstudiante';

@Injectable({
  providedIn: 'root'
})
export class ClaseEstudianteService {
  
  private URL = 'https://ldgr3.cristianbauza.com/api/ClaseEstudiantes';

  constructor(private http: HttpClient) { }

  getClaseEstudiantesClase(claseId: number|undefined) {
    return this.http.get<ClaseEstudiante[]>(this.URL+'/Clase/'+ claseId);
  }

  postClaseEstudiante(claseEstudiante: ClaseEstudiante) {
    return this.http.post(this.URL, claseEstudiante);
  }

  getClaseEstudiante(idClaseEstudiante: string) {
    return this.http.get(this.URL + "/" + idClaseEstudiante);
  }

  putClaseEstudiante(claseEstudiante: ClaseEstudiante) {
    return this.http.put(this.URL+"/"+claseEstudiante.id, claseEstudiante);
  }

  deleteClaseEstudiante(idClaseEstudiante: string) {
    return this.http.delete(this.URL + "/" + idClaseEstudiante);
  }
}
