import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationUser } from 'src/app/model/ApplicationUser';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let usuario = localStorage.getItem('user');

    if (typeof usuario === 'string') {
      let user = JSON.parse(usuario);
      if (user && user.roles) {
        return user.roles.includes("ADMIN");
      }
    }
    return false;
  }

}
