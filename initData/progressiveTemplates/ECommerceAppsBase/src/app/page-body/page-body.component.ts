import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-page-body',
  templateUrl: './app/page-body/page-body.component.html',
  styleUrls: ['./app/page-body/page-body.component.css']
})
export class PageBodyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  	  this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
  }

}
