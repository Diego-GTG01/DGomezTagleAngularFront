import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolModel } from '../Interfaces/RolModel';
import { ResultModel } from '../Interfaces/ResultModel';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private urlBase : string ="http://localhost:8081";

  constructor( private http : HttpClient){}

  getAll(): Observable<ResultModel<RolModel>> {
    return this.http.get<ResultModel<RolModel>>(this.urlBase + "/api/rol");
  }
  
}
