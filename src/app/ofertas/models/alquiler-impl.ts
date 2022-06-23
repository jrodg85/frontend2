import { OfertaImpl } from "./oferta-impl";

export class AlquilerImpl  extends OfertaImpl
{
  filter(arg0: (m: OfertaImpl) => boolean): AlquilerImpl {
    throw new Error('Method not implemented.');
  }
  precioAlquilerMensual: number;
  mesesFianza: number;


constructor(idOferta:number , tituloOferta: string , vivienda: string , urlOferta:string, precioAlquilerMensual: number, mesesFianza:number  ){
  super(idOferta, tituloOferta, vivienda, urlOferta);
  super.tipo=1;
  this.precioAlquilerMensual=precioAlquilerMensual;
  this.mesesFianza=mesesFianza;
}
getIdAlquiler(url: string): string {
  url = url.slice(0, url.length - 1)
  return url.slice(url.lastIndexOf('/') + 1, url.length);
}

}
