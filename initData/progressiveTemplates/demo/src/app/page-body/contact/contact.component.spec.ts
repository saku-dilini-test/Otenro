// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ContactComponent } from './contact.component';

// describe('ContactComponent', () => {
//   let component: ContactComponent;
//   let fixture: ComponentFixture<ContactComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ContactComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ContactComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { PoliciesComponent } from './policies.component';

// describe('PoliciesComponent', () => {
//   let component: PoliciesComponent;
//   let fixture: ComponentFixture<PoliciesComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ PoliciesComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PoliciesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { fakeAsync, TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// import { HomepageComponent } from './homepage.component';
import { MockBackend } from '@angular/http/testing';
import { AppDataService } from '../../services/appdatainfo.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

const mockResponse = {
    "id" : "5a2a120892e5924e0f971f43",
    "appId" : "5a26446aa9d7c46b19cbd64a",
    "address" : "sdfs",
    "telPhone" : "1111111111",
    "email" : "shashan@gmail.com",
    "webSite" : "www.gmail.com",
    "coords" : {
        "latitude" : 6.854990387707877,
        "longitude" : 80.29730581280523
    },
    "updatedAt" : "2017-12-11T06:45:17.708Z",
    "createdAt" : "2017-12-08T04:16:08.716Z"

};


this.appId = (<any>data).appId;
this.userId = (<any>data).userId;

describe('getContactUs()', () => {

  let mockHttp: Http;
  beforeEach(() => {
    mockHttp = { get: null } as Http;

    spyOn(mockHttp, 'get').and.returnValue(Observable.of({
      json: () => mockResponse
    }));

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: Http,
          useValue: mockHttp

        },
        AppDataService
      ]
    });
  });


  it('Contactus data connection', fakeAsync(
    inject([AppDataService], contact => {
      const expectedUrl =  SERVER_URL + '/templates/getContactUs?appId='+this.appId;

      contact.getContactUs('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);

        });
    })

  ));

  it('validate contact data', fakeAsync(
    inject([AppDataService], contact => {
      const expectedUrl =  SERVER_URL + '/templates/getContactUs?appId='+this.appId;

      contact.getContactUs('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});
