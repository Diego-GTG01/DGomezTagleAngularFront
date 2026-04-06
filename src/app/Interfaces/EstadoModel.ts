import { PaisModel } from "./PaisModel";

export interface EstadoModel{
    IdEstado: number,
    Nombre : string,
    Pais : PaisModel
}