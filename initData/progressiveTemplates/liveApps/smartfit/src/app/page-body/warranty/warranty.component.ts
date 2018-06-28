import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-warranty',
  templateUrl: './app/page-body/warranty/warranty.component.html',
  styleUrls: ['./app/page-body/warranty/warranty.component.css']
})
export class WarrantyComponent {


  constructor(private title: TitleService) {
    this.title.changeTitle("Warranty");
  }


}
