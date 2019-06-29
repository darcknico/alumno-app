import { Movimiento } from "./movimiento";

export interface Diaria{
    id:number;
    saldo_anterior:number;
    fecha_inicio:Date;
    fecha_fin:Date;
    saldo:number;
    total_ingreso:number;
    total_egreso:number;

    ingresos:Movimiento[];
    egresos:Movimiento[];
}