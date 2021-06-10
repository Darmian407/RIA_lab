import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../model/Estudiante';
import { Message } from '../model/Message';
import { estudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  message: Message | undefined;

    public estudianteForm: FormGroup = new FormGroup({});
  
    fechaNacimiento = '';

    constructor(private estudianteService: estudianteService) { }

    ngOnSubmit() {
        let estudiante = new Estudiante();
        estudiante.id = 2;
        estudiante.documento = this.estudianteForm.controls.documento.value;
        estudiante.primerApellido = this.estudianteForm.controls.primerApellido.value;
        estudiante.segundoApellido = this.estudianteForm.controls.segundoApellido.value;
        estudiante.primerNombre = this.estudianteForm.controls.primerNombre.value;
        estudiante.segundoNombre = this.estudianteForm.controls.segundoNombre.value;
        estudiante.fechaNacimiento = new Date ('2000-06-09T02:20:26.409Z');
        
        
        
        this.estudianteService.postEstudiantes(estudiante).subscribe(
            response => {
                let msg = new Message();
                msg.type = 'success';
                msg.msg = 'Estudiante creado exitosamente';

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

    ngOnInit(): void {
        this.estudianteForm = new FormGroup({
          documento: new FormControl('', [Validators.required]),
          primerApellido: new FormControl('', [Validators.required]),
          segundoApellido: new FormControl('', [Validators.required]),
          primerNombre: new FormControl('', [Validators.required]),
          segundoNombre: new FormControl('', [Validators.required]),
          fechaNacimiento: new FormControl('', [Validators.required]),
        });
    }

}


