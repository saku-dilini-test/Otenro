import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PagebodyServiceModule } from '../page-body/page-body.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private dataService: PagebodyServiceModule) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.statusText && error.statusText === 'Unknown Error') {
                    this.dataService.showPopupMessage('Oops something went wrong, please try again in a bit.');
                }
                return throwError(error);
            }));
    }
}
