import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBodyComponent } from './page-body.component';
import {Router} from '@angular/router'
// describe('PageBodyComponent', () => {
//   let component: PageBodyComponent;
//   let fixture: ComponentFixture<PageBodyComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ PageBodyComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PageBodyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, inject, getTestBed } from '@angular/core/testing';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
class RoutingComponent { }

@Component({
  template: ''
})
class DummyComponent { }

describe('component: RoutingComponent', () => {
  let location, router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'home', component: DummyComponent }
      ])],
      declarations: [RoutingComponent, DummyComponent]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it('should go home', async(() => {
    let fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/');
      console.log('after expect');
    });
  }));

});
