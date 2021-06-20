import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../model/User';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup = new FormGroup({});

    constructor(private auth: AuthService, private messageService: MessageService, private router: Router) { }

    ngOnSubmit() {
        let user = new User();
        user.userName = this.loginForm.controls.username.value;
        user.password = this.loginForm.controls.password.value;

        this.auth.login(user).subscribe(
            response => {
                localStorage.setItem('auth', JSON.stringify(response));

                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Loged in succesfuly!' });

                this.auth.getUserInfo().subscribe(
                    response => {
                        console.log(response);
                        localStorage.setItem('user', JSON.stringify(response));

                        this.router.navigateByUrl('/');
                    },
                    error => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor' });
                    }
                );
                
            },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect username or password' });
            }
        );

    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

}
