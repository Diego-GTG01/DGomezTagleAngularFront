import { MunicipioModel } from "./MunicipioModel"

export interface ColoniaModel{
    IdColonia : number,
    Nombre : string,
    CodigoPostal : string
    Municipio : MunicipioModel

}