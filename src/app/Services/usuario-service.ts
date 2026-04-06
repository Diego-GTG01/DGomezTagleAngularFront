import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../Interfaces/ResultModel';
import { UsuarioModel } from '../Interfaces/UsuarioModel';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private urlBase : string ="http://localhost:8081";

  constructor( private http : HttpClient){}

  getAll(): Observable<ResultModel<UsuarioModel>> {
    return this.http.get<ResultModel<UsuarioModel>>(this.urlBase + "/api/usuario");
  }
  
}
