import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService{
  private server_url = 'user/getUserProfile';
  private authToken = '';
  //private headers1 = new Headers();
  constructor(private http: Http) { }

  makeRequest(): Promise<any>{
        /*this.authToken = localStorage.getItem("satellizer_token");
        //this.headers1.set("Authorization", "Bearer " + this.authToken );
        var options = new RequestOptions({
            headers: new Headers({
            'Authorization': "Bearer " + this.authToken
            })
        });*/
        return this.http.post(this.server_url,null)
               .toPromise()
               .then(response => {response.json() as any})
  }
}