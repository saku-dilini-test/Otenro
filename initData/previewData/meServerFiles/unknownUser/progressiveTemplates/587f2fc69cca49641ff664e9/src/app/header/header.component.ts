import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagebodyServiceModule } from '../page-body/page-body.service';
import * as data from './../madeEasy.json';
import { TitleService } from "../services/title.service";
import {Location} from '@angular/common';
import {$} from "protractor";

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
  public hideBackOnHome:boolean;
  constructor(private router: Router, private dataService: PagebodyServiceModule,private titleServ: TitleService,private location: Location) {
    this.cartNo = this.dataService.cart.cartItems.length;
    this.title = 'Your Horoscope';

      router.events.subscribe((val) => {
        // see also
        if (val.url == '/'){
          this.hideBackOnHome = false;
        }else{
          this.hideBackOnHome = true;

        }
    });

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
