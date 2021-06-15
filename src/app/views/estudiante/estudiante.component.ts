import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../model/Estudiante';
import { Message } from '../../model/Message';
import { estudianteService } from '../../services/EstudianteService/estudiante.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

    message: Message | undefined;

    public estudianteForm: FormGroup = new FormGroup({});
  
    fechaNacimiento = '';

    constructor(private estudianteService: estudianteService, private messageService: MessageService) { }

    ngOnSubmit() {
        let estudiante = new Estudiante();
        estudiante.documento = this.estudianteForm.controls.documento.value;
        estudiante.primerApellido = this.estudianteForm.controls.primerApellido.value;
        estudiante.segundoApellido = this.estudianteForm.controls.segundoApellido.value;
        estudiante.primerNombre = this.estudianteForm.controls.primerNombre.value;
        estudiante.segundoNombre = this.estudianteForm.controls.segundoNombre.value;
        estudiante.fechaNacimiento = this.estudianteForm.controls.fechaNacimiento.value;;
        
        
        
        this.estudianteService.postEstudiantes(estudiante).subscribe(
            response => {
                
                this.estudianteForm.reset;

                this.messageService.add({severity:'success', summary: 'Success', detail: 'Estudiante creado exitosamente'});
            },
            error => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el estudiante'});
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


