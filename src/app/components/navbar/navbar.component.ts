import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    items: MenuItem[] = [];

    @Input()
    user: string = '';

    constructor() { }

    logout(): void {
        localStorage.clear();
        window.location.reload();
    }

    ngOnInit(): void {
        if (this.user) {
            this.items = [
                {
                    label: `Welcome ${this.user}`,
                    icon: 'pi pi-user',
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: this.logout
                },
            ];
        } else {
            this.items = [
                {
                    label: 'Login',
                    icon: 'pi pi-sign-in',
                    routerLink: ['/login']
                },
            ];
        }

    }

}