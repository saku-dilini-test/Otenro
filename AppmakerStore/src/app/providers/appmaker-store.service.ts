import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppmakerStoreService {

  CMS_API:string;

  constructor() {
    
    this.CMS_API = ENV.CMS_API;
   }
}
