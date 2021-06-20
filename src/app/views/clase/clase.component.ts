import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../model/Message';
import { DropdownModule } from 'primeng/dropdown';
import { clasesService } from 'src/app/services/ClasesService/clases.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Clase } from 'src/app/model/Clase';
import { Curso } from 'src/app/model/Curso';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/CursoService/curso.service';
import * as moment from 'moment';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  curso: Curso = {};

  clasesCurso: Clase[] = [];

  message: Message | undefined;

  public claseForm: FormGroup = new FormGroup({});

  public editarClaseForm: FormGroup = new FormGroup({});

  fechaA = '';

  fecha: Date | undefined | string;

  displayAgregarClaseDialog: boolean = false;

  displayEditarClaseDialog: boolean = false;

  selectedClase: any = {};

  constructor(
    private claseService: clasesService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private route: ActivatedRoute,
    private cursosService: CursoService,
    ) { }

  ngOnSubmit() {
    let clase = new Clase();
    clase.titulo = this.claseForm.controls.titulo.value;
    clase.descripcion = this.claseForm.controls.descripcion.value;
    clase.fecha = this.claseForm.controls.fechaA.value; 
    clase.cursoId = this.curso.id;
    
    
    this.claseService.postClases(clase).subscribe(
        response => {
            
            this.claseForm.reset;

            this.messageService.add({severity:'success', summary: 'Success', detail: 'Clase creada exitosamente'});
        },
        error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear la clase'});
        }
    );

    this.displayAgregarClaseDialog = false;
}

ngOnInit(): void {

    // Route params
    const routeParams = this.route.snapshot.paramMap;
    const cursoId = Number(routeParams.get('cursoId'));
    
    this.claseForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      fechaA: new FormControl('', [Validators.required]),
    });

    this.editarClaseForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
    });

    // Get datos del curso
    this.cursosService.getCurso(cursoId.toString()).subscribe(
      result => {
        this.curso = result;
      }
    );

    // Get clases de un curso
    this.claseService.getClasesCurso(cursoId).subscribe(
      result => {
        this.clasesCurso = result;
      }
    );
}

ngOnDelete(id: number): void {
  this.confirmationService.confirm({
    message: 'Seguro que quieres eliminar la clase?',
    accept: () => {
      this.claseService.deleteClase(id).subscribe(
        result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Clase eliminada exitosamente' }),
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
      );
    },
    reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la clase cancelada' })
  });
}

ngOnEdit(): void {
  let clase = new Clase();
  clase.id = this.selectedClase.id;
  clase.titulo = this.editarClaseForm.controls.titulo.value;
  clase.descripcion = this.editarClaseForm.controls.descripcion.value;
  clase.fecha = this.editarClaseForm.controls.fecha.value; 
  clase.cursoId = this.curso.id;
  
  
  
  this.claseService.putClase(clase).subscribe(
      response => {
        this.claseService.getClases();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Clase modificada exitosamente'});
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al modificar la clase'});
      }
  );
}

showEditarClaseDialog(clase : Clase): void {

  this.selectedClase = clase;
  if(clase.fecha){
     this.fecha = new Date(clase.fecha);
  }
  this.displayEditarClaseDialog = true;    

}

convertirFecha(fecha : Date){

  return moment(fecha).format("DD-MM-YYYY");
  
}

showAgregarClaseDialog(): void {
  this.displayAgregarClaseDialog = true;
}

}


