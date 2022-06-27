import { OfertaImpl } from './oferta-impl';


export class VentaImpl extends OfertaImpl  {


  filter(arg0: (m: OfertaImpl) => boolean): VentaImpl {
    throw new Error('Method not implemented.');
  }
  precioDeVenta: number;
  ;

  constructor(idOferta:number , tituloOferta: string , vivienda: string , urlOferta:string , precioDeVenta: number){
    super(idOferta, tituloOferta, vivienda, urlOferta);
    super.tipo=2;
    this.precioDeVenta=precioDeVenta;

  }

  getIdVenta(url: string): string {
    url = url.slice(0, url.length - 1)
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }

}
