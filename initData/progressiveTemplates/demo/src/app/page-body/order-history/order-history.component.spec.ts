// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { OrderHistoryComponent } from './order-history.component';

// describe('OrderHistoryComponent', () => {
//   let component: OrderHistoryComponent;
//   let fixture: ComponentFixture<OrderHistoryComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ OrderHistoryComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OrderHistoryComponent);
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
import { OrderHistoryComponent } from './order-history.component';
import { MockBackend } from '@angular/http/testing';
import { CurrencyService } from '../../services/currency.service'
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { LocalStorageService } from 'angular-2-local-storage';

const mockResponse = {
  "id": "5a1d2de9a67565c1664f62b3",
  "name": "Sample cat 01",
  "imageUrl": "cat1.png",
  "enteredBy": "demo",
  "templateName": "demo",
  "appId": "5a1d2de9a67565c1664f62b2",
  "createdAt": "2017-11-28T09:35:37.593Z",
  "updatedAt": "2017-11-28T09:35:37.593Z"
};


this.appId = (<any>data).appId;
this.userId = (<any>data).userId;

describe('getOrders()', () => {

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
        CurrencyService
      ]
    });
  });


  it('Orders data connection', fakeAsync(
    inject([CurrencyService], orders => {

        // let appIdParam = registerdUser.get("appLocalStorageUser"+this.appId);
        const expectedUrl = SERVER_URL + '/templates/getOrdersOfUser?appId=' + this.appId + '&userId='+ this.appIdParam

      orders.getOrders()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
          expect(res).toEqual(mockResponse);

        });
    })

  ));

  it('validate ordered data', fakeAsync(
    inject([CurrencyService], orders => {

        // let appIdParam = registerdUser.get("appLocalStorageUser"+this.appId);
        const expectedUrl = SERVER_URL + '/templates/getOrdersOfUser?appId=' + this.appId + '&userId=' + this.appIdParam

      orders.getOrders()
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});

describe('order component data test',()=>{
  it('Test image URl', () =>{
    const test = new OrderHistoryComponent(this.para1,this.para2);

  });
});
