import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './services/AdminGuard/admin.guard';
import { DocenteGuard } from './services/DocenteGuard/docente.guard';
import { AsistenciaComponent } from './views/asistencia/asistencia.component';
import { EvaluacionComponent } from './views/calificacion-estudiante/evaluacion/evaluacion.component';
import { CalificacionesComponent } from './views/calificaciones/calificaciones.component';
import { ClaseComponent } from './views/clase/clase.component';
import { CursoComponent } from './views/curso/curso.component';
import { CursosTableComponent } from './views/cursos-table/cursos-table.component';
import { EstudianteComponent } from './views/estudiante/estudiante.component';
import { EstudiantesCursoComponent } from './views/estudiantes-curso/estudiantes-curso.component';
import { EstudiantesGridComponent } from './views/estudiantes-grid/estudiantes-grid.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RegisterComponent } from './views/register/register.component';
import { UsuariosGridComponent } from './views/usuarios-grid/usuarios-grid.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'estudiantes', component: EstudiantesGridComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'cursos', component: CursosTableComponent, canActivate: [AdminGuard] },
  { path: 'miscursos', component: CursosTableComponent, canActivate: [DocenteGuard] },
  { path: 'curso/estudiantes/:cursoId', component: EstudiantesCursoComponent, canActivate: [AdminGuard] },
  { path: 'usuarios', component: UsuariosGridComponent, canActivate: [AdminGuard] },
  { path: 'curso/estudiantes/:cursoId', component: EstudiantesCursoComponent },
  { path: 'curso/clases/asistencia/:claseId', component: AsistenciaComponent },
  { path: 'curso/clases/:cursoId', component: ClaseComponent },
  { path: 'curso/calificaciones/:cursoId', component: CalificacionesComponent },
  { path: 'curso/calificaciones/evaluacion/:calificacionId', component: EvaluacionComponent },
  { path: '**', component: PageNotFoundComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
