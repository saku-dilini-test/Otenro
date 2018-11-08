import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TitleService {

  private locationSource = new Subject<any>();
  private titleSource = new BehaviorSubject<string>("Home");
  currentTitle = this.titleSource.asObservable();

  constructor() { }

  changeTitle(title: string) {
    this.titleSource.next(title)
  }

  setLocation(location: any){
        this.locationSource.next(location);
  }
  
  getLocation(): Observable<any>{
    return this.locationSource.asObservable();
  }


}
