import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../Interfaces/ResultModel';
import { MunicipioModel } from '../Interfaces/MunicipioModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private urlBase: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getMunicipioByEstado(idEstado : Number): Observable<ResultModel<MunicipioModel>> {
    return this.http.get<ResultModel<MunicipioModel>>(this.urlBase + '/api/municipio?idEstado='+idEstado);
  }
  
}
