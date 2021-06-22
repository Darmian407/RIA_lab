import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApplicationUser } from 'src/app/model/ApplicationUser';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    items: MenuItem[] = [];

    @Input()
    user: ApplicationUser | undefined;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        if (this.user) {
            this.items = [
                {
                    label: `Bienvenido ${this.user.username}`,
                    icon: 'pi pi-user',
                },
                {
                    label: 'Salir',
                    icon: 'pi pi-sign-out',
                    command: this.authService.logout
                },
            ];
        } else {
            this.items = [
                {
                    label: 'Ingresar',
                    icon: 'pi pi-sign-in',
                    routerLink: ['/login']
                },
            ];
        }

    }

}