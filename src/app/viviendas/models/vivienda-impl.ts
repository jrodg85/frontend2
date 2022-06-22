import { Vivienda } from './vivienda';

export class ViviendaImpl implements Vivienda {

  idVivienda: number;
  propietario: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  codigoPostal: number;
  idReferenciaCatastral: string;
  superficie: number;
  ofertasDeVivienda: any[];
  urlVivienda: string;

  constructor (idVivienda: number, propietario: any , provincia: any , ciudad: any , direccion: any , codigoPostal: any , idReferenciaCatastral: any , superficie: any , ofertasDeVivienda: any[]  , urlVivienda: any){
    this.idVivienda = idVivienda;
    this.propietario = propietario;
    this.provincia = provincia;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.codigoPostal = codigoPostal;
    this.idReferenciaCatastral = idReferenciaCatastral;
    this.superficie = superficie;
    this.ofertasDeVivienda = ofertasDeVivienda;
    this.urlVivienda = urlVivienda;
  }



}
