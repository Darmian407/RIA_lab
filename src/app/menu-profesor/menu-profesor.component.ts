import { Component, OnInit } from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.scss']
})

export class MenuProfesorComponent implements OnInit {

    items: MenuItem[]=[];

    ngOnInit() {
        this.items = [
            {
                label: 'Cursos',
                icon: 'pi pi-pw pi-book',
                items: [{
                        label: 'Lista', 
                        icon: 'pi pi-fw pi-list',
                    },
                    {label: 'Editar', icon: 'pi pi-fw pi-pencil'},
                    {separator: true},
                ]
            },
            {
              label: 'Clases',
              icon: 'pi pi-pw pi-bookmark',
              items: [{
                label: 'Lista', 
                icon: 'pi pi-fw pi-list',
            },
            {label: 'Editar', icon: 'pi pi-fw pi-pencil'},
            {separator: true},
        ]
            },
            {
              label: 'Estudiantes',
              icon: 'pi pi-pw pi-users',
              items: [{
                label: 'Lista', 
                icon: 'pi pi-fw pi-list',
                      },
                      {
                label: 'Editar',
                icon: 'pi pi-fw pi-user-edit'},
            {separator: true},
        ]
            },
            {
              label: 'Evaluaciones',
              icon: 'pi pi-pw pi-file',
              items: [{
                label: 'Lista', 
                icon: 'pi pi-fw pi-list',
            },
            {label: 'Editar', icon: 'pi pi-fw pi-pencil'},
            {separator: true},
        ]
            
            }
        ];
      }
}
