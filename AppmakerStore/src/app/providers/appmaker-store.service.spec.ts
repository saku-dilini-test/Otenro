import { TestBed } from '@angular/core/testing';

import { AppmakerStoreService } from './appmaker-store.service';

describe('AppmakerStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppmakerStoreService = TestBed.get(AppmakerStoreService);
    expect(service).toBeTruthy();
  });
});
