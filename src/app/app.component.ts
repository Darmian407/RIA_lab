import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prime-ng';
  
  user: string = '';

    ngOnInit(): void {
        let name = localStorage.getItem('user');

        if (typeof name === 'string') {
            this.user = JSON.parse(name);
        }
    }
}
