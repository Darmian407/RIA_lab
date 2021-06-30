import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Created components
import { NavbarComponent } from './components/navbar/navbar.component';
import { CursoComponent } from './views/curso/curso.component';
import { CursosTableComponent } from './views/cursos-table/cursos-table.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AsistenciaComponent } from './views/asistencia/asistencia.component';
import { ClaseComponent } from './views/clase/clase.component';
import { EstudiantesCursoComponent } from './views/estudiantes-curso/estudiantes-curso.component';

// PrimeNg Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { MessageService, SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { EstudianteComponent } from './views/estudiante/estudiante.component';
import { CalendarModule } from 'primeng/calendar';
import { EstudiantesGridComponent } from './views/estudiantes-grid/estudiantes-grid.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CarouselModule } from 'primeng/carousel';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';

// Services
import { AuthService } from './services/Auth/auth.service';
import { CursoService } from './services/CursoService/curso.service';
import { EstudianteCursoService } from './services/EstudiantesCursoService/estudiante-curso.service';
import { AuthInterceptor } from './services/Auth/auth.interceptor';
import { ConfirmationService } from 'primeng/api';
import { UsuariosGridComponent } from './views/usuarios-grid/usuarios-grid.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AdminGuard } from './services/AdminGuard/admin.guard';
import { ClaseEstudianteService } from './services/ClaseEstudainteService/clase-estudiante.service';
import { DocenteGuard } from './services/DocenteGuard/docente.guard';
import { CalificacionesComponent } from './views/calificaciones/calificaciones.component';
import { EvaluacionComponent } from './views/calificacion-estudiante/evaluacion/evaluacion.component';
import { UserAdminGuard } from './services/UserAdminGuard/user-admin.guard';
import { EstadisticasCursoComponent } from './views/estadisticas-curso/estadisticas-curso.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EstudianteComponent,
    EstudiantesGridComponent,
    CursoComponent,
    CursosTableComponent,
    HomeComponent,
    CarruselComponent,
    MenuComponent,
    EstudiantesCursoComponent,
    UsuariosGridComponent,
    PageNotFoundComponent,
    AsistenciaComponent,
    ClaseComponent,
    CalificacionesComponent,
    EvaluacionComponent,
    EstadisticasCursoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    AvatarModule,
    ButtonModule,
    SharedModule,
    DialogModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    TableModule,
    ToastModule,
    PanelMenuModule,
    CarouselModule,
    DropdownModule,
    ConfirmDialogModule,
    VirtualScrollerModule,
    InputNumberModule,
    ChartModule,
    CheckboxModule,
  ],
  providers: [
    AuthService,
    CursoService,
    MessageService,
    EstudianteCursoService,
    ConfirmationService,
    AdminGuard,
    UserAdminGuard,
    DocenteGuard,
    ClaseEstudianteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
