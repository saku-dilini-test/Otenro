import { Component, OnInit } from '@angular/core';
import { AppmakerStoreService } from '../providers/appmaker-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apps: any;
  searchInput: string;
  searchePhrase: string = '';

  constructor(private appmakerStoreService: AppmakerStoreService) {}

  ngOnInit() {

    // Get all app details
    this.appmakerStoreService.getAppData()
      .subscribe((res: any) => {
      
        if (res.status === "SUCCESS") {

          this.apps = res.data;
        }
    }, err => {

    });
  }

  // Responsible for searching for apps
  searchHandler() {
    
    if (this.searchInput) {
      this.searchePhrase = this.searchInput;
    } 
    else {
      this.searchePhrase = '';
    }
  }

}
