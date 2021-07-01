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

  @Input()
  userName?: string;

  items: MenuItem[] = [];

  ngOnInit() {
    if (this.roles) {
      if (this.roles.includes("ADMIN")) {
        this.items.push(
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
        );
      }
      console.log(this.userName);

      if (this.userName === 'admin') {
        this.items.push({
          label: 'Usuarios',
          icon: 'pi pi-pw pi-users',
          items: [{
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            url: 'usuarios',
          },
          { separator: true },
          ]
        });
      }

      if (this.roles.includes("DOCENTE")) {
        let cursos = this.items.find((elem) => {
          return elem.label === 'Cursos'
        });

        if (cursos) {
          cursos.items?.push({
            label: 'Mis Cursos',
            icon: 'pi pi-fw pi-list',
            routerLink: '/miscursos'
          });
        } else {
          this.items.push(
            {
              label: 'Cursos',
              icon: 'pi pi-pw pi-book',
              items: [
                {
                  label: 'Mis Cursos',
                  icon: 'pi pi-fw pi-list',
                  routerLink: '/miscursos'
                },
                { separator: true },
              ]
            },
          );
        }
      }
    }
  }
}
