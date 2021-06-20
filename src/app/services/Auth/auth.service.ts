import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApplicationUser } from 'src/app/model/ApplicationUser';
import { Role } from 'src/app/model/Role';
import { UserRole } from 'src/app/model/UserRole';
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

    logout(): void {
        localStorage.clear();
        window.location.reload();
    }

    getRoles() {
        return this.http.get<Role[]>(this.URL + '/roles');
    }

    postRole(role: Role) {
        return this.http.post(this.URL + '/roles', role);
    }

    getUsers() {
        return this.http.get<ApplicationUser[]>(this.URL + '/users');
    }

    postUserRole(userRole: UserRole) {
        return this.http.post(this.URL + '/users-role', userRole);
    }

    getUserRole(username: string) {
        return this.http.get<Role>(this.URL + `/users-role?username=${username}`);
    }

    getUserInfo(){
        return this.http.get(this.URL + '/user-info');
    }

}
