import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './app/page-body/complaints/complaints.component.html',
  styleUrls: ['./app/page-body/complaints/complaints.component.css']
})
export class ComplaintsComponent {


  constructor(private title: TitleService) {
    this.title.changeTitle("Complaints");
  }


}
