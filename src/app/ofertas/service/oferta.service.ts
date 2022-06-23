import { Oferta } from './../models/oferta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { environment } from 'src/environments/environment';
import { OfertaImpl } from '../models/oferta-impl';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}ofertas`;

  constructor(
  private http: HttpClient,
  private auxService: AuxiliarService) { }


  getOfertas(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
    }



  mapearOferta(ofertaApi: any): OfertaImpl {
    const urlSelf = ofertaApi._links.self.href;
    console.log(urlSelf);
    const url = urlSelf.split('/');
	  const id =   parseInt(url[url.length -1]);

  return new OfertaImpl(
    id,
    ofertaApi.tituloOferta,
    ofertaApi.vivienda,
    ofertaApi._links.self.href);

  }

  create(oferta: Oferta): void {
  console.log(`Se ha creado la oferta: ${JSON.stringify(oferta)}`);
  }

  postOferta(oferta: OfertaImpl){
    this.http.post(this.urlEndPoint, oferta).subscribe();
  }

  deleteOferta(id: number):Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    ;
    return this.http.delete<any>(url);
  }

  patchOferta(oferta: OfertaImpl) {
    return this.http.patch<any>(`${this.urlEndPoint}/${oferta.idOferta}`, oferta);
  }

  getOfertasPagina(pagina: number): Observable<any> {
  return this.auxService.getItemsPorPagina(this.urlEndPoint, pagina);
  }
}
