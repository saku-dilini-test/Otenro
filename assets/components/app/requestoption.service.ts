import { Injectable }    from '@angular/core';
import { Headers, BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers = new Headers();

    merge(options?: RequestOptionsArgs): RequestOptions {
        var newOptions = super.merge(options);
        newOptions.headers.set('Authorization',"Bearer " + localStorage.getItem("satellizer_token"));
        return newOptions;
    }
}