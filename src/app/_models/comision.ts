import { Usuario } from "./usuario";
import { Sede } from "./sede";
import { Materia } from "./materia";
import { Carrera } from "./carrera";
import { Alumno } from "./alumno";
import { Inscripcion } from "./inscripcion";
import { Modalidad } from './modalidad';

export interface Comision{
    id:number;
    id_usuario:number;
    id_carrera:number;
    id_materia:number;
    id_sede:number;
    anio:number;
    numero:number;
    alumnos_cantidad:number;
    responsable_nombre:string;
    responsable_apellido:string;
    id_modalidad:number;
    estado:boolean;
    created_at:Date;
    updated_at:Date;

    responsable:Usuario;
    sede:Sede;
    materia:Materia;
    carrera:Carrera;
    modalidad:Modalidad;
    alumnos:ComisionAlumno[];
    usuario_baja:Usuario;
    usuario_alta:Usuario;
}

export interface ComisionAlumno{
    id:number;
    id_alumno:number;
    id_comision:number;
    id_inscripcion:number;
    id_usuario:number;
    estado:boolean;
    created_at:Date;
    updated_atDate;

    usuario:Usuario;
    usuario_baja:Usuario;
    alumno:Alumno;
    comision:Comision;
    inscripcion:Inscripcion;
}