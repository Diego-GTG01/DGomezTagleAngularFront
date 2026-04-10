import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../Interfaces/ResultModel';
import { UsuarioModel } from '../Interfaces/UsuarioModel';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private urlBase : string ="http://localhost:8081";

  constructor( private http : HttpClient){}

  getAll(): Observable<ResultModel<UsuarioModel>> {
    return this.http.get<ResultModel<UsuarioModel>>(this.urlBase + "/api/usuario");
  }
  getById(idUsuario : Number){
    return this.http.get<ResultModel<UsuarioModel>>(this.urlBase + "/api/usuario/" + idUsuario)
  }
  add(formData : FormData) : Observable<ResultModel<UsuarioModel>>{
    return this.http.post<ResultModel<UsuarioModel>>(this.urlBase + "/api/usuario", formData);
  }

  updateStatus(idUsuario : Number): Observable<ResultModel<UsuarioModel>>{
    return this.http.post<ResultModel<UsuarioModel>>(this.urlBase + "/api/usuario/status/" + idUsuario, {});
  }
  updateImagen(idUsuario : Number, formData: FormData): Observable<ResultModel<UsuarioModel>>{
    return this.http.post<ResultModel<UsuarioModel>>(this.urlBase + "/api/usuario/imagen?idUsuario=" + idUsuario, formData);
  }
  
}
