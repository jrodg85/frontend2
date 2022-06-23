export class OfertaImpl {
  idOferta: number;
  tipo: number;
  tituloOferta: string;
  urlOferta: string;
  vivienda: string;


  constructor (idOferta:number,tituloOferta: string, vivienda: string , urlOferta: string){
    this.idOferta = idOferta;
    this.tipo = 0;
    this.tituloOferta=tituloOferta;
    this.vivienda = vivienda;
    this.urlOferta=urlOferta;
  }
  getIdOferta(urlOferta: string): string {
    return urlOferta.slice(urlOferta.lastIndexOf('/') + 1, urlOferta.length);
  }

}
//done
