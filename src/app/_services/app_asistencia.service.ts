import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AppAsistencia } from '../_models/app';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Auxiliar } from '../_helpers/auxiliar';
import { Ajax } from './tipo';
 
export interface FiltroAppAsistencia {
    search:string;
    sort:string;
    order:string;
    start:number;
    length:number;
    id_usuario:number;
    id_sede:number;
}
@Injectable()
export class AppAsistenciaService {
    api:string = environment.base_path+'asistencias';
    id_sede:number;
    constructor(
        private http: HttpInterceptorProvider,
        ) {
    }

    getAll(filtro?:FiltroAppAsistencia):Observable<AppAsistencia[]>{
        return this.http.get(this.api,Auxiliar.toParams(filtro));
    }

    ajax(filtro:FiltroAppAsistencia): Observable<Ajax<AppAsistencia>>{
        return this.http.get(this.api,Auxiliar.toParams(filtro));
    }

    register(item:AppAsistencia):Observable<AppAsistencia>{
        return this.http.post(this.api,item);
    }
}