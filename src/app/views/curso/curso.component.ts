import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../model/Curso';
import { Message } from '../../model/Message';
import { CursoService } from '../../services/CursoService/curso.service';
import { DropdownModule } from 'primeng/dropdown';
import { ProfesorService } from 'src/app/services/ProfesorService/profesor.service';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  message: Message | undefined;

  public cursoForm: FormGroup = new FormGroup({});
  
  public docentes: User[] = [];

  constructor(private cursoService: CursoService, private docenteService: ProfesorService) { }

  ngOnInit(): void {
    this.cursoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      programa: new FormControl(''),
      docentes: new FormControl(''),
  });
    this.docentes = this.docenteService.getDocentes();
  }

  ngOnSubmit(){
    let curso = new Curso();
    curso.nombre = this.cursoForm.controls.nombre.value;
    curso.descripcion = this.cursoForm.controls.descripcion.value;
    curso.programa = this.cursoForm.controls.programa.value;
    console.log(this.cursoForm.controls.docentes.value);
    curso.userId = this.cursoForm.controls.docentes.value;

    this.cursoService.postCurso(curso).subscribe(
        response => {
            let msg = new Message();
            msg.type = 'success';
            msg.msg = 'Creacion de curso exitosa';

            this.message = msg;
        },
        error => {
            let msg = new Message();
            msg.type = 'error';
            msg.msg = 'Error';

            this.message = msg;
        }
    );
  }
}
