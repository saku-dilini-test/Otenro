import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import * as data from './../madeEasy.json';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class HeaderComponent {

  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private cartNo: number;
  
  public loginStatus;

  constructor(private router: Router, private dataService: PagebodyServiceModule) {
    this.cartNo = this.dataService.cart.cartItems.length;
  }

  ngAfterContentChecked() {
    this.cartNo = this.dataService.cart.cartItems.length;

    if (localStorage.getItem('appLocalStorageUser' + this.appId) !== null) {
      this.loginStatus = "logged in";
    } else {
      this.loginStatus = "Not logged in";
    }

  }

  logout() {
    localStorage.remove('appLocalStorageUser' + this.appId);
    this.dataService.isUserLoggedIn.check = false;
    this.router.navigate(['home']);
  }

  navigate(val: string) {
    this.router.navigate([val])
  }

  title: string = 'hello';
}
