import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../model/Message';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Curso } from 'src/app/model/Curso';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/CursoService/curso.service';
import * as moment from 'moment';
import { calificacionesService } from 'src/app/services/CalificacionesService/calificaciones.service';
import { Calificacion } from 'src/app/model/Calificacion';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  cursoId: number | undefined;

  calificacionesCurso: Calificacion[] = [];

  message: Message | undefined;

  public calificacionForm: FormGroup = new FormGroup({});

  public editarCalificacionForm: FormGroup = new FormGroup({});

  displayAgregarCalificacionDialog: boolean = false;

  displayEditarCalificacionDialog: boolean = false;

  selectedCalificacion: any = {};

  cols: any[] = [];

  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private route: ActivatedRoute,
    private cursosService: CursoService,
    private calificacionesService: calificacionesService,
    ) { }

  ngOnSubmit() {
    let calificacion = new Calificacion();
    calificacion.titulo = this.calificacionForm.controls.titulo.value;
    calificacion.ponderacion = this.calificacionForm.controls.ponderacion.value; 
    calificacion.cursosId = this.cursoId;

    console.log(calificacion);
    
    this.calificacionesService.postCalificaciones(calificacion).subscribe(
        response => {
            this.calificacionForm.reset;
            if(this.cursoId){
              this.calificacionesService.getCalificacionesCurso(this.cursoId);
            }
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Calificacion creada exitosamente'});
        },
        error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la calificacion'});
        }
    );

    this.displayAgregarCalificacionDialog = false;
}

ngOnInit(): void {

  // Route params
  const routeParams = this.route.snapshot.paramMap;
  this.cursoId = Number(routeParams.get('cursoId'));

  console.log(this.cursoId);
  
  this.calificacionForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    ponderacion: new FormControl('', [Validators.required]),
  });

  this.editarCalificacionForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    ponderacion: new FormControl('', [Validators.required]),
  });

  // Get clases de un curso
  this.calificacionesService.getCalificacionesCurso(this.cursoId).subscribe(
    result => {
      this.calificacionesCurso = result;
    }
  );

  this.cols = [
    { field: 'titulo', header: 'Titulo' },
    { field: 'ponderacion', header: 'Porcentaje de ponderacion' },    
];

}



ngOnDelete(id: number): void {
  this.confirmationService.confirm({
    message: 'Seguro que quieres eliminar la calificacion?',
    accept: () => {
      this.calificacionesService.deleteCalificaciones(id).subscribe(
        result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Calificacion eliminada exitosamente' }),
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
      );
    },
    reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la calificacion cancelada' })
  });
}

ngOnEdit(): void {
  let calificacion = new Calificacion();
  calificacion.id = this.selectedCalificacion.id;
  calificacion.titulo = this.editarCalificacionForm.controls.titulo.value;
  calificacion.ponderacion = this.editarCalificacionForm.controls.ponderacion.value;
  calificacion.cursosId = this.cursoId;
  
  
  
  this.calificacionesService.putCalificaciones(calificacion).subscribe(
      response => {
        if(this.cursoId){
          this.calificacionesService.getCalificacionesCurso(this.cursoId);
        }
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Clase modificada exitosamente'});
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al modificar la clase'});
      }
  );
}

showEditarCalificacion(calificacion : Calificacion): void {

  this.selectedCalificacion = calificacion;
  this.displayEditarCalificacionDialog = true;    

}


showAgregarCalificacionDialog(): void {
  this.displayAgregarCalificacionDialog = true;
}

}