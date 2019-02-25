import { Component, OnInit } from '@angular/core';
import { AppmakerStoreService } from '../providers/appmaker-store.service';
import { SearchPipePipe } from '../shared/pipes/search-pipe/search-pipe.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apps: any[];
  allApps: any[];
  searchInput: string;
  searchePhrase: string = '';
  hasSearchResults: boolean = true;

  constructor(private appmakerStoreService: AppmakerStoreService, private searchPipe: SearchPipePipe) {}

  ngOnInit() {

    // Get all app details
    this.appmakerStoreService.getAppData()
      .subscribe((res: any) => {
      
        if (res.status === "SUCCESS") {

          this.allApps = res.data;
          this.apps = this.allApps;
          if (this.apps.length === 0) {
            this.hasSearchResults = false;
          }
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
    this.apps = this.searchPipe.transform(this.allApps, { appName: this.searchePhrase });
    if (this.apps.length === 0) {
      this.hasSearchResults = false;
    }
    else {
      this.hasSearchResults = true;
    }
  }

}
