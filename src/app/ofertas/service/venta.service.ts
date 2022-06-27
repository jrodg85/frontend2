import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { VentaImpl } from '../models/venta-impl';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}ofertas_de_venta`;

  constructor(private http: HttpClient, private auxService: AuxiliarService) {}

  getVenta(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  findById(idOferta: any) :Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${idOferta}`);
  }

  extraerVenta(respuestaApi: any): VentaImpl[] {
    const venta: VentaImpl[] = [];
    respuestaApi._embedded.ofertas_de_venta.forEach((s: any) => {
      venta.push(this.mapearVenta(s));
    });
    return venta;
  }

  mapearVenta(ventaApi: any): VentaImpl {
    const url = ventaApi._links.self.href;
    const aux = url.split('/');
    const id = (aux[aux.length-1]);
    return new VentaImpl(
      id,
      ventaApi.tituloOferta,
      ventaApi.vivienda,
      url,
      ventaApi.precioDeVenta
    );
  }

  create(oferta: VentaImpl):  Observable<any>  {
    const url = `${this.host}ofertas_de_venta`;

    debugger;
    return this.http.post<any>(url, oferta);
  }
  update(venta: VentaImpl, id: number) : Observable<any>  {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, venta);
  }

  deleteVenta(id: number): Observable<any>{
    return this.http.delete<VentaImpl>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => new Error(e));
      })
    );


  }

  getVentaPagina(pagina: number): Observable<any> {
    return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }
}
