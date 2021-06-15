import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../model/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private URL = 'https://ldgr3.cristianbauza.com/api/Authenticate';

    constructor(private http: HttpClient) { }

    login(data: User) {
        return this.http.post(this.URL + '/login', data);
    }

    signUp(data: User) {
        return this.http.post(this.URL + '/register', data);
    }

}
