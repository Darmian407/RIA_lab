import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../model/Estudiante';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { estudianteService } from '../../services/EstudianteService/estudiante.service';
import { Message } from '../../model/Message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estudiantes-grid',
  templateUrl: './estudiantes-grid.component.html',
  styleUrls: ['./estudiantes-grid.component.css']
})
export class EstudiantesGridComponent implements OnInit {

  message: Message | undefined;

  fechaNacimiento: Date | undefined;

  displayEditarEstudianteDialog: boolean = false;

  editarEstudianteForm: FormGroup = new FormGroup({});

  selectedEstudiante: any = {};


  constructor(public estudianteService: estudianteService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.editarEstudianteForm = new FormGroup({
      documento: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      primerNombre: new FormControl('', [Validators.required]),
      segundoNombre: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
    });
    this.getEstudiantes();
  }

  ngOnSubmit(): void {
        let estudiante = new Estudiante();
        estudiante.id = this.selectedEstudiante.id;
        estudiante.documento = this.editarEstudianteForm.controls.documento.value;
        estudiante.primerApellido = this.editarEstudianteForm.controls.primerApellido.value;
        estudiante.segundoApellido = this.editarEstudianteForm.controls.segundoApellido.value;
        estudiante.primerNombre = this.editarEstudianteForm.controls.primerNombre.value;
        estudiante.segundoNombre = this.editarEstudianteForm.controls.segundoNombre.value;
        estudiante.fechaNacimiento = this.editarEstudianteForm.controls.fechaNacimiento.value;;
        
        
        
        this.estudianteService.putEstudiante(estudiante).subscribe(
            response => {
              this.getEstudiantes();
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Estudiante modificado exitosamente'});
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al modificar el estudiante'});
            }
        );
  }

  getEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(
      response => {
        this.estudianteService.estudiantes = response;

      },
      error => {

      }
    );
  }

  deleteEstudiante(idEstudiante: string) {
    if (confirm('Seguro de querer eliminar a este estudiante?')) {
      this.estudianteService.deleteEstudiante(idEstudiante).subscribe(
        (response) => {
          this.getEstudiantes();
          console.log(response)
        },
        (error) => console.error()
      );

    }
  }

  editEstudiante(estudiante: Estudiante){
    
  }

  showEditarEstudianteDialog(estudiante : Estudiante): void {

    this.selectedEstudiante = estudiante;
    if(estudiante.fechaNacimiento){
       this.fechaNacimiento = new Date(estudiante.fechaNacimiento);
    }
    this.displayEditarEstudianteDialog = true;    

  }

  

}

