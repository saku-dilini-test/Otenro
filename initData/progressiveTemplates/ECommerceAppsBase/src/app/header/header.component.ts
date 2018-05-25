import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import { LocalStorageService } from 'angular-2-local-storage';
import * as data from './../madeEasy.json';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { TitleService } from "../services/title.service";

@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

export class HeaderComponent implements OnInit {
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private cartNo: number;
  public title: string;
  public loginStatus;
  private dummy: any;
  constructor(private localStorageService: LocalStorageService, private router: Router, private dataService: PagebodyServiceModule, private titleServ: TitleService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Home';
    this.dummy = new Date().getTime();
  }

  ngOnInit() {
    this.titleServ.currentTitle.subscribe(message => this.title = message);

    $(".navbar-2").on('show.bs.collapse', function () {
      $('.mobileTitle').removeClass('visible-xs');
      $('.mobileTitle').addClass('hidden');
    });

    $(".navbar-2").on('hide.bs.collapse', function () {
      $('.mobileTitle').addClass('visible-xs');
      $('.mobileTitle').removeClass('hidden');
    });
  }

  ngAfterContentChecked() {
    if (this.dataService.cart.cartItems) {
      this.cartNo = this.dataService.cart.cartItems.length;
    }
    if (this.localStorageService.get('appLocalStorageUser' + this.appId) !== null) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }

  }

  logout() {
    this.localStorageService.remove('appLocalStorageUser' + this.appId);
    this.dataService.isUserLoggedIn.check = false;
    this.dataService.cart.cartItems = [];
    this.router.navigate(['home']);
  }

  navigate(route: string, name: string) {
    this.title = name;

    this.router.navigate([route]);
  }

  manualToggle() {

    this.titleServ.changeTitle("Shopping Cart");
    $('.navbar-2').removeClass('in');
    $('.mobileTitle').addClass('visible-xs');
    $('.mobileTitle').removeClass('hidden');
  }

}
