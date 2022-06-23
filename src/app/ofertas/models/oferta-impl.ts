export class OfertaImpl {
  id: number;
  tipo: number;
  tituloOferta: string;
  urlOferta: string;
  vivienda: string;


  constructor (id:number,tituloOferta: string, urlOferta: string, vivienda: string){
    this.id = id;
    this.tipo = 0;
    this.tituloOferta=tituloOferta;
    this.urlOferta=urlOferta;
    this.vivienda = vivienda;
  }
  getIdOferta(urlOferta: string): string {
    return urlOferta.slice(urlOferta.lastIndexOf('/') + 1, urlOferta.length);
  }

}
//done
