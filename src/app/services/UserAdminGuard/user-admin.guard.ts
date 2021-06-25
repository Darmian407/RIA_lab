import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let usuario = localStorage.getItem('user');

    if (typeof usuario === 'string') {
      let user = JSON.parse(usuario);
      if (user && user.username) {
        return user.username === 'admin';
      }
    }
    return false;
  }
}
