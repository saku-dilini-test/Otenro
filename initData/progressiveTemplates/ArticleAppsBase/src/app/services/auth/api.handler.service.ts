import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthenticatorService } from './authenticator.service';
import * as madeEasy from '../../../assets/madeEasy.json';
import { PagebodyServiceModule } from '../../page-body/page-body.service';

@Injectable()
export class APIHandlerService {
  private jwt = new Subject<any>();
  private appId = (<any>madeEasy).appId;
  private userId = (<any>madeEasy).userId;

  constructor(private authService: AuthenticatorService,
    private dataService: PagebodyServiceModule,
    private httpClient: HttpClient) { }

  public sendAPICall(url): Observable<any> {
    return new Observable(observer => {
      const token = this.authService.getToken().subscribe(tokenResults => {
        if (token) {
          token.unsubscribe();
        }

        let httpOptions = {};

        if (tokenResults.token !== 'none') {
          httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tokenResults.token
            })
          };
        }

        this.httpClient.get(url, httpOptions).subscribe(results => {
          observer.next(results);
        }, error => {
          if (error instanceof HttpErrorResponse) {
            const errorReponse = (<HttpErrorResponse>error);
            const statusCode = errorReponse.status;

            console.log('auth.handler.service: Call api: errorReponse:', errorReponse);

            if (this.dataService.isFromMobile && statusCode === 401
                && errorReponse.error && errorReponse.error.name === 'TokenExpiredError') {
              // Mobile, and if the token expired we need to request a new token
              this.renewTokenAndReSendAPICall(url, observer);
            } else {
              // CMS, so must relogin to the CMS to set the new Token
              console.log('auth.handler.service: Call api: Received error response code:%s', statusCode);
              observer.error(error);
            }
          } else {
            console.log('auth.handler.service: Call api: error not returning a HttpErrorResponse.error:', error);
            observer.error(error);
          }
        });
      }, error => {
        console.log('auth.handler.service: Call getToken error:', error);
        observer.error(error);
      });
    });
  }

  private renewTokenAndReSendAPICall(url: string, observer: Observer<any>) {
    this.authService.getNewToken().subscribe(newToken => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + newToken
        })
      };

      this.httpClient.get(url, httpOptions).subscribe(results => {
        observer.next(results);
      }, error => {
        console.log('api.handler.service.renewTokenAndReSendAPICall: Error renewing the token.Err: ', error);
        observer.error(error);
      });
    }, error => {
      console.log('auth.handler.service: Call renewTokenAndReSendAPICall error:', error);
      observer.error(error);
    });
  }


}