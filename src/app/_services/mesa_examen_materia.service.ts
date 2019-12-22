import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MesaExamenMateria, MesaExamenMateriaAlumno } from '../_models/mesa.examen';
import { Ajax } from './tipo';
import { Auxiliar } from '../_helpers/auxiliar';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
 
export interface FiltroMesaExamenMateria {
    search:string;
    sort:string;
    order:string;
    start:number;
    length:number;
    id_departamento:number;
    id_carrera:number;
    id_materia:number;
    id_mesa_examen:number;
    fecha_ini:string;
    fecha_fin:string;
    cierre:boolean;
    id_usuario:number;
}
@Injectable()
export class MesaExamenMateriaService {

    api:string = environment.base_path+'sedes/';
    private endpoint:string = '/mesas/materias/';
    private _endpoint:string = '/mesas/materias';
    id_sede:number;
    constructor(
        private http: HttpInterceptorProvider,
        ) {
        
    }

    sede(id_sede:number){
        this.id_sede = id_sede;
    }

    getAll(filtro?:FiltroMesaExamenMateria):Observable<MesaExamenMateria[]>{
        return this.http.get(this.api + this.id_sede + this._endpoint );
    }

    ajax(filtro:FiltroMesaExamenMateria):  Observable<Ajax<MesaExamenMateria>>{
        return this.http.get(this.api + this.id_sede + this._endpoint,Auxiliar.toParams(filtro));
    }

    getById(id:number,id_inscripcion:number=null):Observable<MesaExamenMateria> {
        let params = {};
        if(id_inscripcion!=null){
            params['id_inscripcion'] = id_inscripcion;
        }
        return this.http.get(this.api + this.id_sede + this.endpoint +id,params);
    }

    register(item: MesaExamenMateria):Observable<MesaExamenMateria> {
        return this.http.post(
            this.api + this.id_sede + this._endpoint, item);
    }

    alumnos(id_mesa_examen_materia:number):Observable<MesaExamenMateriaAlumno[]>{
        return this.http.get(this.api + this.id_sede + this.endpoint +id_mesa_examen_materia+'/alumnos');
    }

    docentes(id_mesa_examen_materia:number){
        return this.http.get(this.api + this.id_sede + this.endpoint +id_mesa_examen_materia+'/docentes');
    }

}