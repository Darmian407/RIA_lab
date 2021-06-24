import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApplicationUser } from 'src/app/model/ApplicationUser';
import { Role } from 'src/app/model/Role';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { UserRole } from 'src/app/model/UserRole';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios-grid',
  templateUrl: './usuarios-grid.component.html',
  styleUrls: ['./usuarios-grid.component.css']
})
export class UsuariosGridComponent implements OnInit {

  constructor(private authService: AuthService, private messageService: MessageService) { }

  usuarios: ApplicationUser[] = [];

  rolesUsuario: Role[] = [];

  roles: Role[] = [];

  dropdown: Role[] = [];

  usuarioSeleccionado: ApplicationUser = {};

  displayRoleDialog: boolean = false;

  displayNuevoRolDialog: boolean = false;

  agregarRolForm: FormGroup = new FormGroup({});

  agregarRolUsuarioForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.agregarRolUsuarioForm.controls = {
      dropdown: new FormControl('', [Validators.required])
    }

    this.agregarRolForm.controls = {
      nombre: new FormControl('', [Validators.required])
    }

    // Cargo los usuarios del sistema
    this.authService.getUsers().subscribe(result => this.usuarios = result);

    this.getRoles();
  }

  getRoles(): void {
    this.authService.getRoles().subscribe(
      result => {
        this.roles = result.map(elem => {
          let newRole = new Role();
          newRole.nombre = elem;
          return newRole;
        });
      }
    );
  }

  ngOnSubmit(): void {
    let userRole = new UserRole();
    userRole.role = this.agregarRolUsuarioForm.controls.dropdown.value.nombre;
    userRole.userName = this.usuarioSeleccionado.userName;

    this.authService.postUserRole(userRole).subscribe(
      result => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Rol agregado exitosamente' }),
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
    );
  }

  showRoleDialog(usuario: ApplicationUser): void {
    this.usuarioSeleccionado = usuario;
    this.displayRoleDialog = true;

    if (this.usuarioSeleccionado.userName) {
      this.authService.getUserRole(this.usuarioSeleccionado.userName).subscribe(
        result => {
          this.rolesUsuario = result.map(elem => {
            let newRole = new Role();
            newRole.nombre = elem;
            return newRole;
          });
          this.dropdown = this.roles.filter(elem => {
            return !this.rolesUsuario.find(element => {
              return elem.nombre == element.nombre;
            });
          });
        }
      );
    }
  }

  ngNewRol(): void {
    let newRol = new Role();
    newRol.nombre = this.agregarRolForm.controls.nombre.value;

    this.authService.postRole(newRol).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Rol creado exitosamente' });
        this.getRoles();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
    );
  }

  showAgregarRolDialog(): void {
    this.displayNuevoRolDialog = true;
  }
}
