// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

// describe('CartComponent', () => {
//   let component: CartComponent;
//   let fixture: ComponentFixture<CartComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CartComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CartComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { fakeAsync,ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
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
import { TaxService } from '../../services/taxinfo.service'
import { ShippingInfoService } from '../../services/shippinginfo.service'
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

const mockResponse = {
    "_id" : "5a379b17ab5f70fb7a82d1d7",
    "isApplyShippingCharge" : false,
    "isApplyServicesCharge" : false,
    "taxName" : "test tax",
    "taxAmount" : 9,
    "countryRestriction" : [ ],
    "appId" : "5a377949ab5f70fb7a82d1cd",
    "createdAt" : "2017-12-18T10:40:23.704Z",
    "updatedAt" : "2017-12-18T10:40:23.704Z"
}
const mockResponse2 ={

    "_id" : "5a27de8c068f819c66e12d98",
    "locationName" : "p",
    "number" : "sad",
    "streetAddress" : "asdsa",
    "city" : "sadsa",
    "country" : "Sri Lanka",
    "postalCode" : "100",
    "appId" : "5a27db3c068f819c66e12d8f",
    "shippingOption" : "Pick up",
    "optionName" : "p",
    "countryRestriction" : [ ],
    "cost" : 100

}

this.appId = (<any>data).appId;
this.userId = (<any>data).userId;

describe('getTaxInfo()', () => {

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
        TaxService
      ]
    });
  });


  it('Tax data connection', fakeAsync(
    inject([TaxService], tax => {
      const expectedUrl = SERVER_URL + '/edit/getTaxInfo?appId=' + this.appId;

      tax.getTaxInfo('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
        //   expect(res).toEqual(mockResponse);

        });
    })

  ));

  it('validate tax data ', fakeAsync(
    inject([TaxService], tax => {
      const expectedUrl = SERVER_URL + '/edit/getTaxInfo?appId=' + this.appId;

      tax.getTaxInfo('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});

describe('getShippingData()', ()=>{

    let mockHttp: Http;
    beforeEach(() => {
      mockHttp = { get: null } as Http;

      spyOn(mockHttp, 'get').and.returnValue(Observable.of({
        json: () => mockResponse2
      }));

      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          {
            provide: Http,
            useValue: mockHttp
          },
          ShippingInfoService,TaxService
        ]
      });
    });

    it('Shippinginfo data connection', fakeAsync(
        inject([ShippingInfoService], currency => {
          const expectedUrl = SERVER_URL + "/edit/getShippingInfo?appId="+this.appId;

          currency.getShippingInfo('Angular')
            .subscribe(res => {
              expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
            //   expect(res).toEqual(mockResponse2);
            });
        })

      ));
      it('validate shipping data ', fakeAsync(
        inject([TaxService], tax => {
          const expectedUrl = SERVER_URL + "/edit/getShippingInfo?appId="+this.appId;

          tax.getShippingInfo('Angular')
            .subscribe(res => {
              expect(res).toEqual(mockResponse2);
            });
        })

      ));

});
