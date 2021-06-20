import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './services/AdminGuard/admin.guard';
import { CursoComponent } from './views/curso/curso.component';
import { CursosTableComponent } from './views/cursos-table/cursos-table.component';
import { EstudianteComponent } from './views/estudiante/estudiante.component';
import { EstudiantesCursoComponent } from './views/estudiantes-curso/estudiantes-curso.component';
import { EstudiantesGridComponent } from './views/estudiantes-grid/estudiantes-grid.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'estudiante', component: EstudianteComponent },
  { path: 'estudiantes', component: EstudiantesGridComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'cursos', component: CursosTableComponent, canActivate: [AdminGuard] },
  { path: 'curso/estudiantes/:cursoId', component: EstudiantesCursoComponent, canActivate: [AdminGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
