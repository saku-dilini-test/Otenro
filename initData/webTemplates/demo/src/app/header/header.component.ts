import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  navigate(val:string){
    this.router.navigate([val])
  }

  title:string = "Black Friday";
}
