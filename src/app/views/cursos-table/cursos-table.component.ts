import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/model/Curso';
import { Message } from 'src/app/model/Message';
import { User } from 'src/app/model/User';
import { CursoService } from 'src/app/services/CursoService/curso.service';
import { ProfesorService } from 'src/app/services/ProfesorService/profesor.service';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.css']
})
export class CursosTableComponent implements OnInit {

  public cursos: Curso[] = [];

  message: Message | undefined;
  
  selectedCurso: any = {};
  selectedDocente: User = {};
  
  editarCursoForm: FormGroup = new FormGroup({});

  displayEditarCursoDialog: boolean = false;

  public docentes: User[] = [];


  constructor(
    private cursosService: CursoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private docenteService: ProfesorService,
  ) { }

  ngOnInit(): void {
    this.editarCursoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      programa: new FormControl(''),
      docentes: new FormControl(''),
    });
    this.getCursos();
    this.docentes = this.docenteService.getDocentes();

  }


  getCursos() {
    this.cursosService.getCursos().subscribe(
      response => {
        this.cursos = response;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Info', detail: 'Error interno del sistema' });
      }
    );
  }

  ngOnSubmit(): void {
    let curso = new Curso();
    curso.nombre = this.editarCursoForm.controls.nombre.value;
    curso.descripcion = this.editarCursoForm.controls.descripcion.value;
    curso.programa = this.editarCursoForm.controls.programa.value;
    curso.userId = this.editarCursoForm.controls.docentes.value;
    
    
    
    this.cursosService.putCurso(curso).subscribe(
        response => {
          this.getCursos();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Estudiante modificado exitosamente'});
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al modificar el estudiante'});
        }
    );
}


  ngOnDelete(idCurso: string): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar este curso?',
      accept: () => {
        this.cursosService.deleteCurso(idCurso).subscribe(
          result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Curso eliminado exitosamente' }),
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }) 
        );
        window.location.reload();
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación del Curso cancelada' })
    });
  }

  showEditarCursoDialog(curso : Curso): void {

    this.selectedCurso = curso;
    this.displayEditarCursoDialog = true;    

  }

}
