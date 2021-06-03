import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../model/Message';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    message: Message | undefined;

    public registerForm: FormGroup = new FormGroup({});

    constructor(private auth: AuthService) {}

    ngOnSubmit() {
        let user = new User();
        user.username = this.registerForm.controls.username.value;
        user.password = this.registerForm.controls.password.value;
        user.email = this.registerForm.controls.email.value;

        this.auth.signUp(user).subscribe(
            response => {
                let msg = new Message();
                msg.type = 'success';
                msg.msg = 'Registro exitoso';

                this.message = msg;
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
        this.registerForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
        });
    }

}
