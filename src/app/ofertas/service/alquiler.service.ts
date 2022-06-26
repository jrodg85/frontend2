import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}ofertas_de_alquiler`;

  constructor(private http: HttpClient, private auxService: AuxiliarService) {}

  getAlquiler(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  findById(idOferta: any) :Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${idOferta}`);
  }

  extraerAlquiler(respuestaApi: any): AlquilerImpl[] {
    const alquiler: AlquilerImpl[] = [];
    respuestaApi._embedded.ofertas_de_alquiler.forEach((a: any) => {
      alquiler.push(this.mapearAlquiler(a));
    });
    return alquiler;
  }

  mapearAlquiler(alquilerAPI: any): AlquilerImpl {
    const url = alquilerAPI._links.self.href;
    const aux = url.split('/');
    const id = (aux[aux.length - 1]);
    ;
    return new AlquilerImpl(
      id,
      alquilerAPI.tituloOferta,
      alquilerAPI.vivienda,
      url,
      alquilerAPI.precioAlquilerMensual,
      alquilerAPI.mesesFianza
    );
  }

  create(oferta: AlquilerImpl):  Observable<any>  {
    const url = `${this.host}ofertas_de_alquiler`;

    return this.http.post<any>(url, oferta);
  }

  update(alquiler: OfertaImpl, id: number) : Observable<any>  {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, alquiler);
  }

  deleteAlquiler(id: number): Observable<any>{
    return this.http.delete<AlquilerImpl>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => new Error(e));
      })
    );


  }

  getAlquilerPagina(pagina: number): Observable<any> {
    return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }
}
