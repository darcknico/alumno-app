import {Injectable} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController, Platform } from '@ionic/angular';
import { HttpNativeProvider } from './http-native';
import { HttpAngularProvider } from './http-angular';
import { Router } from '@angular/router';
import { AlertProvider } from './alert.provider';

@Injectable()
export class HttpInterceptorProvider {
    public http: HttpNativeProvider | HttpAngularProvider;

    token:string;

    constructor(
        private authService:AuthService,
        private navController:NavController,
        private alert:AlertProvider,
        private platform: Platform,
        private angularHttp: HttpAngularProvider, 
        private nativeHttp: HttpNativeProvider,
        private router: Router
        ) {
            this.http = this.platform.is('cordova') ? this.nativeHttp : this.angularHttp;
            this.authService.getTokenStateObserver().subscribe(response=>{
                this.token = response;
            });
        }

    public get(url: string|(string|number)[], params?: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.get(dir,params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public post(url: string|(string|number)[], params: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.post(dir, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public put(url: string|(string|number)[], params: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.put(dir, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public delete(url: string|(string|number)[], params?: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.delete(dir, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public interceptor(err){
        console.log(err);
        if(err.status==400){
            this.navController.navigateRoot('home');
            return of([]);
        } else if(err.status==401){
            console.log(err.error);
            this.alert.present(
                'Error',
                null,
                err.error.error,
                ['OK']
            );
            this.authService.logout();
            return throwError(err);
        } else if(err.status==504){
            this.alert.present('Error',null,'Conexion perdida',[]);
            return of([]);
        } else if(err.status==500){
            this.alert.present('Error',null,'Problemas en el sistema',[]);
            return of([]);
        }
        return throwError(err);
    }
}