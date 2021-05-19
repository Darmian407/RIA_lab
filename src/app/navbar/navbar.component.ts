import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  displayEditDialog1 = false;
  displayEditDialog2 = false;  
  
  
  constructor() { }

  items: MenuItem[] = [];

  ngOnInit(): void {
      this.items = [
          {
              label:'Login',
              icon:'pi pi-sign-in',
              
          },
          {
              label:'Register',
              icon:'pi pi-sign-in',
          }
      ];
  }

}



