import { ColoniaModel } from "./ColoniaModel";

export interface DireccionModel{
    IdDireccion : Number,
    Calle :string,
    NumeroExterior: string,
    NumeroInterior : string,
    Colonia : ColoniaModel

}