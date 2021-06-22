import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/model/ApplicationUser';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-usuarios-grid',
  templateUrl: './usuarios-grid.component.html',
  styleUrls: ['./usuarios-grid.component.css']
})
export class UsuariosGridComponent implements OnInit {

  constructor(private authService: AuthService) { }

  usuarios: ApplicationUser[] = [];

  displayRoleDialog: boolean = false;

  ngOnInit(): void {
    // Cargo los usuarios del sistema
    this.authService.getUsers().subscribe(result => this.usuarios = result);
  }

  showRoleDialog(): void {
    this.displayRoleDialog = true;
  }
}
