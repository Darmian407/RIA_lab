import { Component, OnInit } from '@angular/core';
import {TableModule} from 'primeng/table';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/services/CursoService/curso.service';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.css']
})
export class CursosTableComponent implements OnInit {

  public cursos: Curso[] = [];

  constructor(private cursosService: CursoService) { }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(
      response => {
        console.log(response);
        this.cursos = response;
      },
      error => {
         
      }
  );
    }

}
