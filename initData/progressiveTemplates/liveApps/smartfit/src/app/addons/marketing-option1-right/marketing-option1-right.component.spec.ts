import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingOption1Component } from './marketing-option1-right.component';

describe('MarketingOption1Component', () => {
  let component: MarketingOption1Component;
  let fixture: ComponentFixture<MarketingOption1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingOption1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingOption1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
