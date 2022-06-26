import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertaViviendaService {
  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}viviendas/`;
  constructor(private http: HttpClient) { }

  getOfertasVivienda(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}${id}/ofertasDeVivienda`);
  }
}
