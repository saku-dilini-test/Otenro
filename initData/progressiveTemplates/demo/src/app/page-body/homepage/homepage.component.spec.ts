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
import { HomepageComponent } from './homepage.component';
import { MockBackend } from '@angular/http/testing';
import { HomepageService } from '../../services/homepage.service'
import { SERVER_URL } from '../../constantsService';
import * as data from '../../madeEasy.json';

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

describe('getCategories()', () => {

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
        HomepageService
      ]
    });
  });


  it('Categories data connection', fakeAsync(
    inject([HomepageService], categories => {
      const expectedUrl = SERVER_URL + '/templates/getSpecificChild?appId=' + this.appId;

      categories.getCategories('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
          expect(res).toEqual(mockResponse);

        });
    })

  ));

  it('validate category data', fakeAsync(
    inject([HomepageService], categories => {
      const expectedUrl = SERVER_URL + '/templates/getSpecificChild?appId=' + this.appId;

      categories.getCategories('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});

describe('check User Data', () => {

  it('Check App Id ', () => {
    let homeComponent = new HomepageComponent(this.para1,this.para2, this.para3);
    expect(homeComponent.appId).toBe(this.appId);
  });

  it('Check User Id ', () => {
    let homeComponent = new HomepageComponent(this.para1,this.para2,this.para3);
    expect(homeComponent.userId).toBe(this.userId);
  });

  let router = {
    navigate: jasmine.createSpy('navigate')
  }

});
