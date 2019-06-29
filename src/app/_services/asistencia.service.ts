import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Asistencia, AsistenciaAlumno } from '../_models/asistencia';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Auxiliar } from '../_helpers/auxiliar';
 
export interface FiltroAsistencia {
    search:string;
    sort:string;
    order:string;
    start:number;
    length:number;
    id_departamento:number;
    id_carrera:number;
    id_materia:number;
}
@Injectable()
export class AsistenciaService {
    api:string = environment.base_path+'sedes';
    id_sede:number;
    resource:string='asistencias';
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

    ajax(filtro:FiltroAsistencia){
        return this.http.get([this.api,this.id_sede,this.resource],Auxiliar.toParams(filtro));
    }

    getById(id:number) {
        return this.http.get([this.api,this.id_sede,this.resource,id]);
    }

    register(item: Asistencia) {
        return this.http.post([this.api,this.id_sede,'comisiones',item.id_comision,this.resource],item);
    }

    delete(id: number) {
        return this.http.delete([this.api,this.id_sede,this.resource,id]);
    }

    alumno(item: AsistenciaAlumno) {
        return this.http.post([this.api,this.id_sede,this.resource,item.id_asistencia,'alumnos',item.id_alumno], item);
    }

    alumnos(id_asistencia:number) {
        return this.http.get([this.api,this.id_sede,this.resource,id_asistencia,'alumnos']);
    }

    check_in(id_asistencia:number){
        return this.http.get(
            [this.api,this.id_sede,this.resource,id_asistencia,'check_in'],{responseType: 'blob'});
    }

    check_out_previa(id_asistencia:number,archivo){
        let input = new FormData();
        input.append('archivo', archivo);
        return this.http.post([this.api,this.id_sede,this.resource,id_asistencia,'check_out','previa'],input);
    }

    check_out(id_asistencia:number,archivo){
        let input = new FormData();
        input.append('archivo', archivo);
        return this.http.post([this.api,this.id_sede,this.resource,id_asistencia,'check_out'], input);
    }

    tipos() {
        return this.http.get(environment.base_path+'asistencias/alumnos/tipos');
    }
}