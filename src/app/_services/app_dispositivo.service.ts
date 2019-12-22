import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Ajax } from './tipo';
import { UsuarioDispositivo } from '../_models/app';
import { Auxiliar } from '../_helpers/auxiliar';
 
export interface FiltroAppDispositivo {
    search:string;
    sort:string;
    order:string;
    start:number;
    length:number;
    id_usuario:number;
}
@Injectable()
export class AppDispositivoService {
    api:string = environment.base_path+'dispositivos';
    id_sede:number;
    constructor(
        private http: HttpInterceptorProvider,
        ) {
    }

    getAll(filtro?:FiltroAppDispositivo):Observable<UsuarioDispositivo[]>{
        return this.http.get(this.api,Auxiliar.toParams(filtro));
    }

    ajax(filtro:FiltroAppDispositivo):  Observable<Ajax<UsuarioDispositivo>>{
        return this.http.get(this.api,Auxiliar.toParams(filtro));
    }

    register(item:UsuarioDispositivo):Observable<UsuarioDispositivo>{
        return this.http.post(this.api,item);
    }

    destroy(id):Observable<UsuarioDispositivo>{
        return this.http.delete([this.api,id]);
    }
}