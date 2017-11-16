import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service'; 


@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css']
})
export class HeaderComponent {
  cartNo:number;
  
  constructor(private router: Router,private dataService : PagebodyServiceModule) { 
    this.cartNo = this.dataService.cart.cartItems.length;    
  }

  ngAfterContentChecked()	  {
    this.cartNo = this.dataService.cart.cartItems.length;
  }

  navigate(val:string){
    this.router.navigate([val])
  }

  title:string = 'hello';
}
