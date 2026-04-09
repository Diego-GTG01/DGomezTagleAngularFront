import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../Interfaces/ResultModel';
import { ColoniaModel } from '../Interfaces/ColoniaModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColoniaService {

  private urlBase: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getColoniaByMunicipio (idMunicipio: Number): Observable<ResultModel<ColoniaModel>> {
      return this.http.get<ResultModel<ColoniaModel>>(this.urlBase + '/api/colonia?idMunicipio='+idMunicipio);
  }
  
}
