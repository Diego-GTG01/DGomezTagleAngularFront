import { DireccionModel } from "./DireccionModel";
import { RolModel } from "./RolModel";

export interface UsuarioModel {
    IdUsuario : number,
    ImagenFile : string,
    UserName :string,
    Nombre : string,
    ApellidoPaterno: string,
    ApellidoMaterno : string,
    Email: string,
    Password : string,
    FechaNacimiento : Date,
    Sexo : string,
    Telefono : string,
    Celular : string,
    CURP : string,
    UltimoAcceso : Date,
    Activo : number,
    Rol : RolModel,
    Direcciones : DireccionModel[]
    







}