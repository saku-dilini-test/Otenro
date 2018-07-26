import { TestBed, inject } from '@angular/core/testing';

import { SubscribedDataService } from './subscribed-data.service';

describe('SubscribedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscribedDataService]
    });
  });

  it('should ...', inject([SubscribedDataService], (service: SubscribedDataService) => {
    expect(service).toBeTruthy();
  }));
});
