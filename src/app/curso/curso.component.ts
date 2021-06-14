import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../model/Curso';
import { Message } from '../model/Message';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  message: Message | undefined;

  public cursoForm: FormGroup = new FormGroup({});
  
  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.cursoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      programa: new FormControl(''),
  });
  }

  ngOnSubmit(){
    let curso = new Curso();
    curso.nombre = this.cursoForm.controls.nombre.value;
    curso.descripcion = this.cursoForm.controls.descripcion.value;
    curso.programa = this.cursoForm.controls.programa.value;
    curso.userId = '783d7ff2-7616-41de-83aa-c43f5d61b653';
    
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
