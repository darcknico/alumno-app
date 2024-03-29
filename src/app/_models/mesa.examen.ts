import { Sede } from "./sede";
import { Usuario } from "./usuario";
import { Carrera } from "./carrera";
import { Materia } from "./materia";
import { Alumno, TipoCondicionAlumno } from "./alumno";
import { Inscripcion } from "./inscripcion";

export interface MesaExamen{
    id:number;
    id_sede:number;
    id_usuario:number;
    fecha_inicio:string;
    fecha_fin:string;
    numero:number;
    nombre:string;
    estado:boolean;
    created_at:Date;
    updated_at:Date;

    sede:Sede;
    usuario:Usuario;
    materias:MesaExamenMateria[];
}

export interface MesaExamenMateria{
    id:number;
    id_mesa_examen:number;
    id_carrera:number;
    id_materia:number;
    fecha:string;
    fecha_cierre:string;
    alumnos_cantidad:number;
    alumnos_cantidad_presente:number;
    ubicacion:string;
    check_in:string;
    check_out:string;
    libro:string;
    folio:string;
    observaciones:string;
    estado:boolean;
    created_at:Date;
    updated_at:Date;

    mesa_examen:MesaExamen;
    carrera:Carrera;
    materia:Materia;
    usuario:Usuario;
    usuario_check_in:Usuario;
    usuario_check_out:Usuario;
    alumnos:MesaExamenMateriaAlumno[];
}

export interface MesaExamenMateriaAlumno{
    id:number;
    id_mesa_examen_materia:number;
    id_alumno:number;
    id_inscripcion:number;
    id_usuario:number;
    id_tipo_condicion_alumno:number;
    asistencia:boolean;
    nota:number;
    nota_nombre:number;
    observaciones:string;

    mesa_examen_materia:MesaExamenMateria;
    alumno:Alumno;
    inscripcion:Inscripcion;
    usuario:Usuario;
    usuario_baja:Usuario;
    condicion:TipoCondicionAlumno;
}

export interface AlumnoMateriaNota{
    id:number;
    id_alumno:number;
    id_inscripcion:number;
    id_materia:number;
    id_usuario:number;
    id_tipo_condicion_alumno:number;
    asistencia:boolean;
    nota:number;
    nota_nombre:number;
    observaciones:string;
    fecha:string;
    libro:string;
    folio:string;

    alumno:Alumno;
    inscripcion:Inscripcion;
    materia:Materia;
    usuario:Usuario;
    condicion:TipoCondicionAlumno;
}