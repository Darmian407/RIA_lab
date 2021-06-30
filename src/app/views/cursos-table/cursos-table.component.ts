import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/model/Curso';
import { Message } from 'src/app/model/Message';
import { User } from 'src/app/model/User';
import { CursoService } from 'src/app/services/CursoService/curso.service';
import { EstudianteCursoService } from 'src/app/services/EstudiantesCursoService/estudiante-curso.service';
import { ProfesorService } from 'src/app/services/ProfesorService/profesor.service';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.css'],
})
export class CursosTableComponent implements OnInit {
  rol: string | undefined;

  public cursos: Curso[] = [];

  message: Message | undefined;

  selectedCurso: any = {};
  selectedDocente: User = {};

  editarCursoForm: FormGroup = new FormGroup({});

  displayEditarCursoDialog: boolean = false;

  public docentes: User[] = [];

  cols: any[] = [];

  constructor(
    private cursosService: CursoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private docenteService: ProfesorService,
    private estudianteCursoService: EstudianteCursoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editarCursoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      programa: new FormControl(''),
      docentes: new FormControl(''),
    });
    this.getCursos();
    if (this.rol?.includes("ADMIN")) this.docentes = this.docenteService.getDocentes();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'programa', header: 'Programa' },
    ];
  }

  getCursos() {
    let usuario = localStorage.getItem('user');

    if (typeof usuario === 'string') {
      let user = JSON.parse(usuario);
      if (user && user.roles) {
        this.rol = user.roles;
        if (this.router.url.includes('/cursos/estudiante/')) {
          // Route params
          const routeParams = this.route.snapshot.paramMap;
          const id = Number(routeParams.get('id'));

          this.estudianteCursoService.getCursosEstudiante(id).subscribe(
            (response) => {
              let aux: Curso[] = [];
              for (let i = 0; i < response.length; i++) {
                if (response[i].curso) {
                  aux.push(response[i].curso || new Curso());
                }
              }
              this.cursos = aux;
              console.log(aux);
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Info',
                detail: 'Error interno del sistema',
              });
            }
          );
        } else {
          if (this.router.url.includes('/miscursos')) {
            this.cursosService.getMisCursos().subscribe(
              (response) => {
                this.cursos = response;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Info',
                  detail: 'Error interno del sistema',
                });
              }
            );
          } else {
            if (this.router.url.includes('/cursos')) {
              this.cursosService.getCursos().subscribe(
                (response) => {
                  this.cursos = response;
                },
                (error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Info',
                    detail: 'Error interno del sistema',
                  });
                }
              );
            }
          }
        }
      }
    }
  }

  ngOnSubmitEdit(): void {
    this.selectedCurso.nombre = this.editarCursoForm.controls.nombre.value;
    this.selectedCurso.descripcion = this.editarCursoForm.controls.descripcion.value;
    this.selectedCurso.programa = this.editarCursoForm.controls.programa.value;
    this.selectedCurso.docenteId = this.editarCursoForm.controls.docentes.value;
    this.selectedCurso.docente = {};

    console.log(this.selectedCurso);
    
    this.cursosService.putCurso(this.selectedCurso).subscribe(
      (response) => {
        this.displayEditarCursoDialog = false;
        this.getCursos();
        this.editarCursoForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Curso modificado exitosamente',
        });
      },
      (error) => {
        console.log(error);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al modificar el Curso',
        });
      }
    );
  }

  ngOnDelete(idCurso: string): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar este curso?',
      accept: () => {
        this.cursosService.deleteCurso(idCurso).subscribe(
          (result) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Curso eliminado exitosamente',
            });
            this.getCursos();
          },
          (error) =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
            })
        );
      },
      reject: () =>
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Eliminación del Curso cancelada',
        }),
    });
  }

  showEditarCursoDialog(curso: Curso): void {
    this.selectedCurso = curso;
    console.log(this.selectedCurso);
    
    this.displayEditarCursoDialog = true;
  }
}
