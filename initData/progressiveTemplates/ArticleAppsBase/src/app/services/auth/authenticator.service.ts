import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagebodyServiceModule } from '../../page-body/page-body.service';
import { ParentJWTService } from '../parent.jwt.service';

var authService;

@Injectable()
export class AuthenticatorService {
  private jwt = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private parentJWTService: ParentJWTService,
              private dataService: PagebodyServiceModule) {
                authService = this;
              }

  getNewToken(): Observable<any> {
    return new Observable(observer => {
      const formData = {
        appId: this.dataService.appId,
        msisdn: this.dataService.getLocalStorageMSISDN(),
        uuId: this.dataService.getLocalStorageUUID()
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      const url = this.dataService.getServerURL() + '/auth/getTokenForMobileUser';

      this.httpClient.post(url, formData, httpOptions).subscribe(newToken => {
        this.dataService.setLocalStorageToken(newToken['token']);
        observer.next(newToken['token']);
      }, error => {
        observer.error(error);
      });
    });
  }

  public getToken(): Observable<any> {
    return new Observable(observer => {
      if (this.dataService.isFromMobile) {
        const token = this.dataService.getLocalStorageToken();
        if (token) {
          observer.next({ 'token': token });
        } else {
          this.getNewToken().subscribe(newToken => {
            observer.next({ 'token': newToken });
          }, error => {
            console.log('auth.service: Error occured when getToken error:', error);
            observer.error(error);
          });
        }
      } else {
        const tokenSubscription = this.getParentToken().subscribe(message => {
          tokenSubscription.unsubscribe();
          observer.next(message);
        });
      }
    });
  }

  public getParentToken(): Observable<any> {
    authService.parentJWTService.getToken(authService.getParentJWTCallback);
    return authService.jwt.asObservable();
  }

  getParentJWTCallback(token: any) {
    console.log('getParentJWTCallback in authService=>', token);
    authService.jwt.next({ 'token': token });
  }

}