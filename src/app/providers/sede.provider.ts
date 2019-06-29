import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpInterceptorProvider } from './http-interceptor';
import { DepositoProvider } from './deposito.provider';
import { Sede } from '../_models/sede';
 
@Injectable()
export class SedeProvider {
    sede$:BehaviorSubject<Sede> = new BehaviorSubject(null);
    api = environment.base_path;
    
    constructor(
        private http: HttpInterceptorProvider,
        private deposito:DepositoProvider,
        ) { }
 
    seleccionar(sede:Sede):Observable<boolean>{
        return this.http.post(this.api + 'sedes/'+ sede.id +'/seleccionar',{}).pipe(
            map(res=>{
                if(res){
                    this.deposito.setItem('id_sede',res.sede.id);
                    this.sede$.next(res.sede);
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

    actualizar(){
        return this.http.get(this.api + 'sedes/seleccionar').subscribe(response=>{
            if(response){
                this.deposito.setItem('id_sede',response.id_sede);
                this.sede$.next(response.sede);
            }
        },error=>{
            this.sede$.next(null);
        });
    }

    getSede(){
        return this.sede$.value;
    }

    getIdSede(){
        return this.deposito.getItem('id_sede');
    }

    getIdSedeObservable():Observable<number>{
        return this.http.get(this.api + 'sedes/seleccionar').pipe(
            map(res=>{
                if(res){
                    return res.id_Sede;
                } else {
                    return 0;
                }
            })
        );
    }

}