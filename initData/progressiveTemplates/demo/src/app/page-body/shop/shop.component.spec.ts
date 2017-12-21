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
import { ShopService } from '../../services/shop.service'
import { CurrencyService } from '../../services/currency.service'
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service'
import { LocalStorageService } from 'angular-2-local-storage';

const mockResponse = {
    "id" : "586cd655641694232165c1ac",
    "name" : "Korea Crocheted",
    "selection" : [
        {
            "name" : "Size",
            "vType" : "Large"
        }
    ],
    "enteredBy" : "demo",
    "detailedDesc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut iuet magna aliqua.",
    "tempImageArray" : [
        {
            "img" : "14.JPG"
        }
    ],
    "variants" : [
        {
            "name" : "Korea Crocheted",
            "sku" : "1111",
            "selection" : [
                {
                    "name" : "Size",
                    "vType" : "Large"
                }
            ],
            "price" : "150",
            "quantity" : 250
        }
    ],
    "published" : "YES",
    "imageUrl" : "14.JPG",
    "createdDate" : "1483527676578",
    "appId" : "586cd655641694232165c19c",
    "childId" : "586cd655641694232165c1a0",
    "createdAt" : "2017-01-04T11:02:45.253Z",
    "updatedAt" : "2017-01-04T11:02:45.253Z"
}
const mockResponse2 ={

        "id" : "589c475d3685292e22667068",
        "sign" : "FBu",
        "currency" : "Burundian Franc",
        "symbol" : "bif",
        "createdAt" : "2017-02-09T10:41:33.090Z",
        "updatedAt" : "2017-02-09T10:41:33.090Z"

}

this.appId = (<any>data).appId;
this.userId = (<any>data).userId;

describe('getProducts()', () => {

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
        ShopService,PagebodyServiceModule
      ]
    });
  });


  it('Product data connection', fakeAsync(
    inject([ShopService,PagebodyServiceModule], (products,dataService) => {
      const expectedUrl = SERVER_URL + '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + dataService.catId;

      products.getProducts('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
          expect(res).toEqual(mockResponse);

        });
    })

  ));

  it('validate product data ', fakeAsync(
    inject([ShopService,PagebodyServiceModule], (categories,dataService) => {
      const expectedUrl = SERVER_URL + '/templates/getProductsByCatId?appId=' + this.appId + '&childId=' + dataService.catId;

      categories.getProducts('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});

describe('getCurrencies()', ()=>{

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
          CurrencyService
        ]
      });
    });

    it('Currencies data connection', fakeAsync(
        inject([CurrencyService], currency => {
          const expectedUrl = SERVER_URL + '/templates/getCurrency?appId=' + this.appId

          currency.getCurrencies('Angular')
            .subscribe(res => {
              expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
              expect(res).toEqual(mockResponse2);
            });
        })

      ));

});
