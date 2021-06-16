import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private URL = 'https://ldgr3.cristianbauza.com/api/Authenticate';

  constructor(private http: HttpClient) { }

  getDocentes() {
    let users: User[] = [];

    this.http.get<User[]>(this.URL+'/users').subscribe(
      response => {
        response.forEach(element => {
            this.getRole(element.userName).subscribe(
              role => {
                if(role == 'DOCENTE'){
                  users.push(element);
                }
              }
            )
        });
      }
    );


    return users;
  }

  getDocente(idUser: string | undefined) {
    return this.http.get(this.URL + "/" + idUser);
  }

  getRole(username: string | undefined){
    return this.http.get(this.URL + '/users-role?username='+ username)
  }
  
}
