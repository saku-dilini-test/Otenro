import { TestBed, inject } from '@angular/core/testing';

import { AppdataInfoService } from './appdata-info.service';

describe('AppdataInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppdataInfoService]
    });
  });

  it('should ...', inject([AppdataInfoService], (service: AppdataInfoService) => {
    expect(service).toBeTruthy();
  }));
});
