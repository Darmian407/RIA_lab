import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let usuario = localStorage.getItem('user');

    if (typeof usuario === 'string') {
      let user = JSON.parse(usuario);
      if (user && user.roles) {
        return user.roles.includes("DOCENTE");
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
