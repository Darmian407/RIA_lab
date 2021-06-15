import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  images: string[]=[];
	
	

	constructor() { 
		
	}

	ngOnInit() {
			this.images = ["https://i.postimg.cc/ncvNx9XP/Grupo-9.jpg","https://i.postimg.cc/j23FyNDT/Grupo-9-2.jpg"];
		
    }
    
}
  