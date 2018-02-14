import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app/footer/footer.component.html',
  styleUrls: ['./app/footer/footer.component.css']
})
export class FooterComponent{

  constructor(private router: Router,) { }

  navigate(val: string) {
    this.router.navigate([val])
  }


}
