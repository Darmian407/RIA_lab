import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Cursos',
        icon: 'pi pi-pw pi-book',
        items: [
          {
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            routerLink: '/cursos'
          },
          {
            label: 'Editar',
            icon: 'pi pi-fw pi-pencil',
            routerLink: '/curso'
          },
          { separator: true },
        ]
      },
      // {
      //   label: 'Clases',
      //   icon: 'pi pi-pw pi-bookmark',
      //   items: [{
      //     label: 'Lista',
      //     icon: 'pi pi-fw pi-list',
      //   },
      //   { label: 'Editar', icon: 'pi pi-fw pi-pencil' },
      //   { separator: true },
      //   ]
      // },
      {
        label: 'Estudiantes',
        icon: 'pi pi-pw pi-users',
        items: [{
          label: 'Lista',
          icon: 'pi pi-fw pi-list',
          url: 'estudiantes',
        },
        {
          label: 'Editar',
          icon: 'pi pi-fw pi-user-edit',
          url: 'estudiante',
        },
        { separator: true },
        ]
      },
      // {
      //   label: 'Evaluaciones',
      //   icon: 'pi pi-pw pi-file',
      //   items: [{
      //     label: 'Lista',
      //     icon: 'pi pi-fw pi-list',
      //   },
      //   { label: 'Editar', icon: 'pi pi-fw pi-pencil' },
      //   { separator: true },
      //   ]

      // }
    ];
  }
}
