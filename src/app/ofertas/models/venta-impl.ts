import { OfertaImpl } from './oferta-impl';


export class VentaImpl extends OfertaImpl  {


  filter(arg0: (m: OfertaImpl) => boolean): VentaImpl {
    throw new Error('Method not implemented.');
  }
  precioVenta: number;
  ;

  constructor(idOferta: number, tituloOferta: string,   precioVenta: number, urlOferta: string, vivienda: string){
    super(idOferta, tituloOferta, vivienda , urlOferta);
    super.tipo=2;
    this.precioVenta=precioVenta;

  }

  getIdVenta(url: string): string {
    url = url.slice(0, url.length - 1)
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }

}
