import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Created components
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

// PrimeNg Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CalendarModule } from 'primeng/calendar';
import { EstudiantesGridComponent } from './estudiantes-grid/estudiantes-grid.component';
import {TableModule} from 'primeng/table';


import { CursoComponent } from './curso/curso.component';
import { CursoService } from './services/curso.service';
import { CursosTableComponent } from './curso/cursos-table/cursos-table.component';
import { AuthInterceptor } from './services/auth.interceptor';

import { HomeComponent } from './home/home.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import {CarouselModule} from 'primeng/carousel';
import { CarruselComponent } from './carrusel/carrusel.component';


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
    MenuProfesorComponent,
    CarruselComponent,
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
    PanelMenuModule,
    CarouselModule,
  ],
  providers: [AuthService,CursoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
