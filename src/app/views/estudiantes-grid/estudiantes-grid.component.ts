import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../model/Estudiante';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { estudianteService } from '../../services/EstudianteService/estudiante.service';
import { Message } from '../../model/Message';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes-grid',
  templateUrl: './estudiantes-grid.component.html',
  styleUrls: ['./estudiantes-grid.component.css']
})
export class EstudiantesGridComponent implements OnInit {

  message: Message | undefined;

  fechaNacimiento: Date | undefined | string;

  displayEditarEstudianteDialog: boolean = false;

  editarEstudianteForm: FormGroup = new FormGroup({});

  selectedEstudiante: any = {};

  queryName: string = "";

  queryLastname: string = "";

  queryDocument: string = "";

  index: number = 1;

  estudiantes: { 'lista': Estudiante[], 'size': number } = { 'lista': [], 'size': 0 };

  cols: any[] = [];

  constructor(
    public estudianteService: estudianteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

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

    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'segundoApellido', header: 'Segundo Apellido' },
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'segundoNombre', header: 'Segundo Nombre' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
    ];

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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estudiante modificado exitosamente' });

        this.getEstudiantes();
        this.displayEditarEstudianteDialog = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al modificar el estudiante' });
      }
    );
  }

  getEstudiantes() {
    this.estudianteService.getEstudiantesPaging(this.index, this.queryName, this.queryLastname, this.queryDocument).subscribe(
      response => {
        this.estudiantes = response;
      },
      error => {
      }
    );
  }


  deleteEstudiante(idEstudiante: string) {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar este estudiante?',
      accept: () => {
        this.estudianteService.deleteEstudiante(idEstudiante).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estudiante eliminado exitosamente' });
            this.getEstudiantes();
          },
          (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminaci??n del Estudiante cancelada' })
    });
  }

  showEditarEstudianteDialog(estudiante: Estudiante): void {

    this.selectedEstudiante = estudiante;
    if (estudiante.fechaNacimiento) {
      this.fechaNacimiento = new Date(estudiante.fechaNacimiento);
    }
    this.displayEditarEstudianteDialog = true;

  }

  convertirFecha(fechaNacimiento: Date) {

    return moment(fechaNacimiento).format("DD-MM-YYYY");

  }

  next() {
    if (this.isFirstPage()) {
      this.index++;
      this.getEstudiantes();
    }
  }

  prev() {
    if (this.isLastPage()) {
      this.index--;
      this.getEstudiantes();
    }
  }

  reset() {
    this.index = 1;
    this.getEstudiantes();
  }

  isLastPage(): boolean {
    return this.index * 10 > this.estudiantes.size;
  }

  isFirstPage(): boolean {
    return this.index === 1;
  }

  filter(e: any) {
    switch (e.target.id) {
      case 'documento':
        if (!(e.target.value === "")) {
          this.queryDocument = `&documento=${e.target.value}`;
        } else {
          this.queryDocument = "";
        }
        break;
      case 'nombre':
        if (!(e.target.value === "")) {
          this.queryName = `&nombre=${e.target.value}`;
        } else {
          this.queryName = "";
        }
        break;
      case 'apellido':
        if (!(e.target.value === "")) {
          this.queryLastname = `&apellido=${e.target.value}`;
        } else {
          this.queryLastname = "";
        }
        break;

      default:
        break;
    }
    this.getEstudiantes()
  }


}

