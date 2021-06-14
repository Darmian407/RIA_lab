import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../model/Estudiante';
import { estudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-estudiantes-grid',
  templateUrl: './estudiantes-grid.component.html',
  styleUrls: ['./estudiantes-grid.component.css']
})
export class EstudiantesGridComponent implements OnInit {

  

  constructor(public estudianteService: estudianteService) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(
      response=> {
        this.estudianteService.estudiantes = response;
      
      },
      error=>{

      }
    );
  }
}
