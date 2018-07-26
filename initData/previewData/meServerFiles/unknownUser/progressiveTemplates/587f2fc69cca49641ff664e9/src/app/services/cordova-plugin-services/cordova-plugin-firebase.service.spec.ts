import { TestBed, inject } from '@angular/core/testing';

import { CordovaPluginFirebaseService } from './cordova-plugin-firebase.service';

describe('CordovaPluginFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CordovaPluginFirebaseService]
    });
  });

  it('should ...', inject([CordovaPluginFirebaseService], (service: CordovaPluginFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
