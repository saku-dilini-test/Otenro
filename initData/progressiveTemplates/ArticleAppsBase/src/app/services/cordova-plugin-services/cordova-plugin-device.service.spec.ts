import { TestBed, inject } from '@angular/core/testing';

import { CordovaPluginDeviceService } from './cordova-plugin-device.service';

describe('CordovaPluginDeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CordovaPluginDeviceService]
    });
  });

  it('should ...', inject([CordovaPluginDeviceService], (service: CordovaPluginDeviceService) => {
    expect(service).toBeTruthy();
  }));
});
