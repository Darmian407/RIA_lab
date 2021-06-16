import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstudianteCurso } from 'src/app/model/EstudianteCurso';

@Injectable({
    providedIn: 'root'
})
export class EstudianteCursoService {

    private URL = 'https://ldgr3.cristianbauza.com/api/EstudiantesCursos';

    constructor(private http: HttpClient) { }

    getEstudiantesCurso(cursoId: number) {
        return this.http.get<EstudianteCurso[]>(this.URL + `/?cursoId=${cursoId}`);
    }

    getEstudiantesCursoById(id: number) {
        return this.http.get<EstudianteCurso>(this.URL + `/${id}`);
    }

    deleteEstudiantesCursoById(id: number) {
        return this.http.delete(this.URL + `/${id}`);
    }

    postEstudiantesCurso(data: EstudianteCurso) {
        return this.http.post(this.URL, data);
    }
}
