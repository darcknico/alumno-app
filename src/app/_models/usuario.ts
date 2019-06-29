import { TipoDocumento } from "./tipo_documento";

export interface UsuarioSede{
    id:number;
    id_sede:number;
    id_usuario:number;
    id_usuario_alta:number;
    estado:boolean;
    created_at:string;
    updated_at:string;

    usuario_alta:Usuario;
}

export interface TipoUsuario{
    id:number;
    nombre:string;
    descripcion:string;
}

export interface Usuario {
    estado: boolean;
    created_at: string;
    updated_at: string;
    email: string;
    nombre?: any;
    apellido?: any;
    fecha_nacimiento?: any;
    telefono: string;
    celular: string;
    direccion: string;
    direccion_numero: string;
    direccion_piso: string;
    direccion_dpto?: any;
    documento?: any;
    id_tipo_documento: number;
    id_tipo_usuario: number;
    id: number;

    tipo:TipoUsuario;
    tipo_documento:TipoDocumento;
    sedes:UsuarioSede[];

    password:string;
    c_password:string;
    n_password:string;
}