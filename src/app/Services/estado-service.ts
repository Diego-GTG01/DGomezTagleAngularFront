import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoModel } from '../Interfaces/EstadoModel';
import { ResultModel } from '../Interfaces/ResultModel';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private urlBase: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getEstadoByPais(idPais : Number): Observable<ResultModel<EstadoModel>> {
    return this.http.get<ResultModel<EstadoModel>>(this.urlBase + '/api/estado?idPais='+idPais);
  }
}
