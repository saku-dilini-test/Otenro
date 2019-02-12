import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' },
  )
};

@Injectable({
  providedIn: 'root'
})
export class AppmakerStoreService {

  CMS_API:string;

  constructor(private http: HttpClient) {
    
    this.CMS_API = ENV.CMS_API;
   }

  /**
   * Responsible for getting all app data from backend
   * @return apps as an Observable<any>
   **/
  getAppData(): Observable<any> {

    return this.http.get(this.CMS_API + 'appmakerStore/getAllApps', httpOptions)
      .pipe(
        catchError(this.handleError('getAppData', []))
      );
  } 

  /**
   * Responsible for downloading apk file
   * @return blob as an Observable<any>
   **/
  downloadApk(app: any): Observable<any> {

    return this.http.post(this.CMS_API + 'appmakerStore/sendAPKFile', app, {
      responseType: "blob", headers: new HttpHeaders(
        { 'Content-Type': 'application/json' },
      )
    })
      .pipe(
        catchError(this.handleError('downloadApk', []))
      );
  }

  /**
   * Responsible for checking apk file is exists for download
   **/
  checkApkFileExists(app: any): Observable<any> {

    return this.http.post(this.CMS_API + 'appmakerStore/checkApkFileExists', app, httpOptions)
      .pipe(
        catchError(this.handleError('checkApkFileExists', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
