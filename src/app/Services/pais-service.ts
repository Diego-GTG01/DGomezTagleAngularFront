import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolModel } from '../Interfaces/RolModel';
import { PaisModel } from '../Interfaces/PaisModel';
import { ResultModel } from '../Interfaces/ResultModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private urlBase : string ="http://localhost:8081";

  constructor( private http : HttpClient){}

  getAll(): Observable<ResultModel<PaisModel>> {
    return this.http.get<ResultModel<PaisModel>>(this.urlBase + "/api/pais");
  }
}
