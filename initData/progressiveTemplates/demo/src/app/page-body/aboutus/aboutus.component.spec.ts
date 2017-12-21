// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AboutusComponent } from './aboutus.component';

// describe('AboutusComponent', () => {
//   let component: AboutusComponent;
//   let fixture: ComponentFixture<AboutusComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AboutusComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AboutusComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

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
    "id" : "5a3250ad3633e2841e8c2103",
    "currencySign" : "$",
    "currency" : "$",
    "returnPolicy" : "<p>asasasas </p>",
    "termsAndCondition" : "<p>asas</p>",
    "privacyPolicy" : "<p>asasasas</p>",
    "userId" : "5a1d3bfefbd84f926f907992",
    "appId" : "5a3250843633e2841e8c20fa",
    "updatedAt" : "2017-12-14T10:21:33.888Z",
    "createdAt" : "2017-12-14T10:21:33.927Z"
};


this.appId = (<any>data).appId;
this.userId = (<any>data).userId;

describe('getAboutUs()', () => {

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


  it('Aboutus data connection', fakeAsync(
    inject([AppDataService], aboutus => {
      const expectedUrl = SERVER_URL + "/templates/getAboutUs?appId="+this.appId;

      aboutus.getAboutUs('Angular')
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);

        });
    })

  ));

  it('validate about us data', fakeAsync(
    inject([AppDataService], aboutus => {
      const expectedUrl = SERVER_URL + "/templates/getAboutUs?appId="+this.appId;

      aboutus.getAboutUs('Angular')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        });
    })

  ));

});
