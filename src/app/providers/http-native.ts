import {Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable, throwError } from 'rxjs';
import { Auxiliar } from '../_helpers/auxiliar';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable()
export class HttpNativeProvider {

    constructor(
        public http: HTTP,
        ) {
        this.http.setDataSerializer('json');
    }

    public get(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.get(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError(error => this.parseError(error))
        );
    }

    public delete(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.delete(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError(error => this.parseError(error))
        );
    }

    public post(url:string, params: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        options['Content-Type'] = 'application/json';
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.post(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData).pipe(
            catchError(error => this.parseError(error))
        );
    }

    public put(url:string, params: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        options['Content-Type'] = 'application/json';
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.put(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData).pipe(
            catchError(error => this.parseError(error))
        );
    }

    private parseError(err){
        err.error = JSON.parse(err.error);
        return throwError(err);
    }
}