import { EstadoModel } from "./EstadoModel";

export interface MunicipioModel{
    IdMunicipio : number,
    Nombre :string,
    Estado : EstadoModel
}