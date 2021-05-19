import {Component, OnInit} from "@angular/core";



import {Router} from "@angular/router";


@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    private username: string;
    private password: string;

    displayEditDialog = false;

    constructor() {

    }

    ngOnInit():void {
       
      
    }


    
}