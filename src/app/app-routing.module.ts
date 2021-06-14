import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoComponent } from './curso/curso.component';
import { CursosTableComponent } from './curso/cursos-table/cursos-table.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudiantesGridComponent } from './estudiantes-grid/estudiantes-grid.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'estudiantes', component: EstudiantesGridComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'cursos', component: CursosTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
