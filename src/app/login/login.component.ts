import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../model/Message';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    message: Message | undefined;

    public loginForm: FormGroup = new FormGroup({});

    constructor(private auth: AuthService) { }

    ngOnSubmit() {
        let user = new User();
        user.username = this.loginForm.controls.username.value;
        user.password = this.loginForm.controls.password.value;
        
        this.auth.login(user).subscribe(
            response => {
                let msg = new Message();
                msg.type = 'success';
                msg.msg = 'Login exitoso';

                this.message = msg;
                localStorage.setItem('auth', JSON.stringify(response));
            },
            error => {
                let msg = new Message();
                msg.type = 'error';
                msg.msg = 'Error';

                this.message = msg;
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
