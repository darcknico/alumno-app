import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comision, ComisionAlumno } from '../_models/comision';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Auxiliar } from '../_helpers/auxiliar';
 
export interface FiltroComision {
    search:string;
    sort:string;
    order:string;
    start:number;
    length:number;
    id_departamento:number;
    id_carrera:number;
    id_materia:number;
    cerrado:boolean;
}
export interface ComisionAjax{
    items: Comision[];
    total_count: number;
}
@Injectable()
export class ComisionService {
    api:string = environment.base_path+'sedes';
    id_sede:number;
    resource:string='comisiones';
    constructor(
        private http: HttpInterceptorProvider,
        ) { 
    }

    sede(id_sede:number){
        this.id_sede = id_sede;
    }

    getAll(){
        return this.http.get([this.api,this.id_sede,this.resource]);
    }

    ajax(filtro:FiltroComision){
        return this.http.get([this.api,this.id_sede,this.resource], Auxiliar.toParams(filtro));
    }

    getById(id:number) {
        return this.http.get([this.api,this.id_sede,this.resource,id]);
    }

    register(item: Comision) {
        return this.http.post([this.api,this.id_sede,this.resource], item);
    }

    update(item: Comision) {
        return this.http.put([this.api,this.id_sede,this.resource,item.id], item);
    }

    delete(id: number) {
        return this.http.delete([this.api,this.id_sede,this.resource,id]);
    }

    alumno_asociar(item: ComisionAlumno) {
        return this.http.post([this.api,this.id_sede,this.resource,item.id_comision,'alumnos',item.id_alumno], item);
    }

    alumno_desasociar(item: ComisionAlumno) {
        return this.http.delete([this.api,this.id_sede,this.resource,item.id_comision,'alumnos',item.id_alumno]);
    }

    alumnos(id_comision:number){
        return this.http.get([this.api,this.id_sede,this.resource,id_comision,'alumnos']);
    }

    alumnos_disponibles(id_comision:number){
        return this.http.get([this.api,this.id_sede,this.resource,id_comision,'alumnos','disponibles']);
    }

    asistencias(id_comision:number){
        return this.http.get([this.api,this.id_sede,this.resource,id_comision,'asistencias']);
    }

    examenes(id_comision:number){
        return this.http.get([this.api,this.id_sede,this.resource,id_comision,'examenes']);
    }

    carreras(id:number) {
        return this.http.get([this.api,this.id_sede,this.resource,'carreras',id]);
    }

    materias(id:number) {
        return this.http.get([this.api,this.id_sede,this.resource,'materias',id]);
    }

    reporte(id:number){
        return this.http.get([this.api,this.id_sede,this.resource,id,'reporte'],{responseType: 'blob'});
    }
}