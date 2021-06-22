import { Component } from '@angular/core';
import { ApplicationUser } from './model/ApplicationUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Libreta Digital';

  user: ApplicationUser | undefined;

  ngOnInit(): void {
    let usuario = localStorage.getItem('user');

    if (typeof usuario === 'string') {
      this.user = JSON.parse(usuario);
    }
  }
}
