import { Component, Input, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Role } from 'src/app/model/Role';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input()
  roles?: string[];

  items: MenuItem[] = [];

  ngOnInit() {
    if (this.roles) {
      if (this.roles.includes("ADMIN")) {
        this.items = [
          {
            label: 'Cursos',
            icon: 'pi pi-pw pi-book',
            items: [
              {
                label: 'Listar',
                icon: 'pi pi-fw pi-list',
                routerLink: '/cursos'
              },
              {
                label: 'Agregar',
                icon: 'pi pi-fw pi-pencil',
                routerLink: '/curso'
              },
              { separator: true },
            ]
          },
          {
            label: 'Estudiantes',
            icon: 'pi pi-pw pi-users',
            items: [{
              label: 'Lista',
              icon: 'pi pi-fw pi-list',
              url: 'estudiantes',
            },
            {
              label: 'Agregar',
              icon: 'pi pi-fw pi-user-plus',
              url: 'estudiante',
            },
            { separator: true },
            ]
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-pw pi-users',
            items: [{
              label: 'Lista',
              icon: 'pi pi-fw pi-list',
              url: 'usuarios',
            },
            { separator: true },
            ]
          }
        ];
      } else {
        this.items = [
          {
            label: 'Cursos',
            icon: 'pi pi-pw pi-book',
            items: [
              {
                label: 'Listar',
                icon: 'pi pi-fw pi-list',
                routerLink: '/miscursos'
              },
              { separator: true },
            ]
          },
        ];
      }
    }
  }
}
