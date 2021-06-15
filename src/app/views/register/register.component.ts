import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../model/User';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup = new FormGroup({});

    constructor(private auth: AuthService, private messageService: MessageService, private router: Router) {}

    ngOnSubmit() {
        let user = new User();
        user.userName = this.registerForm.controls.username.value;
        user.password = this.registerForm.controls.password.value;
        user.email = this.registerForm.controls.email.value;

        this.auth.signUp(user).subscribe(
            response => {
                this.messageService.add({severity:'success', summary: 'Success', detail: 'User registered succesfuly!'});
                
                this.router.navigate(['/login']);
            },
            error => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error creating the user'});
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
