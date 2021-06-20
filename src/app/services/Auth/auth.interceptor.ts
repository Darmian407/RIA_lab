import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private messageService: MessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = localStorage.getItem('auth');

        if (typeof auth === 'string') {
            const token = JSON.parse(auth).token;
            const expiration = JSON.parse(auth).expiration;
            if (token && expiration && moment(expiration).isAfter()) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });

                return next.handle(cloned);

            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token invalido' });
                this.authService.logout();
                return next.handle(req);
            }

        } else {
            return next.handle(req);
        }
    }
}
