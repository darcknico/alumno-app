import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NovedadSistema } from '../_models/novedad';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Observable } from 'rxjs';
import { Ajax } from './tipo';
import { Auxiliar } from '../_helpers/auxiliar';

export interface FiltroNovedadSistema{
    search:string;
    sort:string;
    order:string;
    page:number;
    length:number;
    id_usuario:number;
}
@Injectable()
export class NovedadSistemaService {

    api:string = environment.base_path+'sedes';
    resource:string='novedades/sistemas';
    id_sede:number;

    constructor(
        private http: HttpInterceptorProvider,
        ) {
    }

    sede(id_sede:number){
        this.id_sede = id_sede;
    }

    get url(){
        return [this.api,this.id_sede,this.resource].join('/');
    }

    getAll(filtro:FiltroNovedadSistema=<FiltroNovedadSistema>{}):Observable<NovedadSistema[]> {
        return this.http.get( [this.url].join('/'),Auxiliar.toParams(filtro));
    }

    ajax(filtro:FiltroNovedadSistema):Observable<Ajax<NovedadSistema>> {
        return this.http.get( [this.url].join('/'),Auxiliar.toParams(filtro));
    }
 
    getById(id: number,id_usuario:number = 0):Observable<NovedadSistema> {
        return this.http.get([this.url,id].join('/'),{
                id_usuario:String(id_usuario),
            }
        );
    }

    mostrar(item: NovedadSistema):Observable<NovedadSistema>{
        return this.http.post([this.url,item.id,'mostrar'].join('/'), item);
    }

}