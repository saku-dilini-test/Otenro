// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { CheckoutComponent } from './checkout.component';

// describe('CheckoutComponent', () => {
//   let component: CheckoutComponent;
//   let fixture: ComponentFixture<CheckoutComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CheckoutComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CheckoutComponent);
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
import { ShippingInfoService } from '../../services/shippinginfo.service';
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

const mockResponse = {

    "id" : "5a37984eab5f70fb7a82d1d4",
    "locationName" : "asd",
    "number" : "asd",
    "streetAddress" : "asd",
    "city" : "asd",
    "country" : "Sri Lanka",
    "postalCode" : "123",
    "appId" : "5a377949ab5f70fb7a82d1cd",
    "shippingOption" : "Pick up",
    "optionName" : "asd",
    "countryRestriction" : [ ],
    "createdAt" : "2017-12-18T10:28:30.188Z",
    "updatedAt" : "2017-12-18T10:28:30.188Z"

};


this.appId = (<any>data).appId;
this.userId = (<any>data).userId;

describe('getShippingPickupInfo()', () => {

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
        ShippingInfoService
      ]
    });
  });


  it('Data connection', fakeAsync(
    inject([ShippingInfoService], categories => {
      const expectedUrl = SERVER_URL + "/edit/getShippingPickupInfo?appId=" + this.appId;

      categories.getShippingPickupInfo('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);

        });
    })

  ));

  it('validate pickup data', fakeAsync(
    inject([ShippingInfoService], categories => {
      const expectedUrl = SERVER_URL + "/edit/getShippingPickupInfo?appId=" + this.appId;

      categories.getShippingPickupInfo('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});


// describe('check User Data', () => {

//   it('Check App Id ', () => {
//     let homeComponent = new HomepageComponent(this.para1,this.para2, this.para3);
//     expect(homeComponent.appId).toBe(this.appId);
//   });

//   it('Check User Id ', () => {
//     let homeComponent = new HomepageComponent(this.para1,this.para2,this.para3);
//     expect(homeComponent.userId).toBe(this.userId);
//   });

//   let router = {
//     navigate: jasmine.createSpy('navigate')
//   }

// });
