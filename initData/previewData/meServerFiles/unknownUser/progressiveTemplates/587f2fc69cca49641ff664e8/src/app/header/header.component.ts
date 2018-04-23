import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import * as data from './../madeEasy.json';
import { TitleService } from "../services/title.service";

@Component({
  selector: 'app-header',
  templateUrl: './app/header/header.component.html',
  styleUrls: ['./app/header/header.component.css'],
})

export class HeaderComponent implements OnInit{
  private appId = (<any>data).appId;
  private userId = (<any>data).userId;
  private cartNo: number;
  public title:string;
  constructor(private router: Router, private dataService: PagebodyServiceModule,private titleServ: TitleService) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Your Horoscope';
  }

  ngOnInit() {
    this.titleServ.currentTitle.subscribe(message => this.title = message);

    $(".navbar-2").on('show.bs.collapse', function(){
      $('.mobileTitle').removeClass('visible-xs');
      $('.mobileTitle').addClass('hidden');
    });

    $(".navbar-2").on('hide.bs.collapse', function(){
      $('.mobileTitle').addClass('visible-xs');
      $('.mobileTitle').removeClass('hidden');
    });
  }


  navigate(route: string, name: string) {
    this.title = name;
    this.router.navigate([route]);
     document.getElementById("mySidenav").style.width = "0";
  }

  manualToggle() {

    this.titleServ.changeTitle("Shopping Cart");
    $('.navbar-2').removeClass('in');
    $('.mobileTitle').addClass('visible-xs');
    $('.mobileTitle').removeClass('hidden');
  }

  openNav() {
      document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }

}
