import { Component, OnInit } from '@angular/core';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { Vivienda } from '../models/vivienda';
import { ViviendaImpl } from '../models/vivienda-impl';
import { ViviendaService } from '../service/vivienda.service';

@Component({
  selector: 'app-viviendas',
  templateUrl: './viviendas.component.html',
  styleUrls: ['./viviendas.component.css']
})
export class ViviendasComponent implements OnInit {

  viviendas: Vivienda[] = [];
  todasViviendas: Vivienda[] = [];
  numPaginas: number = 0;
  viviendaVerDatos: Vivienda = new ViviendaImpl(0,"","","","",0,"",0,[],"");

  constructor(
    private viviendaService: ViviendaService,
    private auxService: AuxiliarService,
  ) { }



  ngOnInit(): void {
    this.viviendaService.getViviendas().subscribe((response) => this.viviendas = this.viviendaService.extraerViviendas(response));
    this.getTodasViviendas();

  }

  verDatos(vivienda: Vivienda): void {
    this.viviendaVerDatos = vivienda;
  }

  onViviendaEliminar(vivienda: Vivienda): void {
    ;
    console.log(`He eliminado a ${vivienda.idVivienda}`);
    this.viviendaService.deleteVivienda(vivienda.idVivienda).subscribe(
      () => { console.log('vivienda eliminada');},
      (error) => {console.error(error);}
    )
    this.viviendas = this.viviendas.filter(v => vivienda !== v);
  }

  getTodasViviendas(): void {
    this.viviendaService.getViviendas().subscribe(r => {
      this.numPaginas = this.auxService.getPaginasResponse(r);
      for (let index = 1; index <= this.numPaginas; index++) {
        this.viviendaService.getViviendasPagina(index)
          .subscribe(response => {
            this.todasViviendas.push(...this.viviendaService.extraerViviendas(response));
          });
      }
    });
  }

  borrarVivienda(id: number): void {
    this.viviendaService.deleteVivienda(id);
  }

  modificarVivienda(vivienda: ViviendaImpl): void {
    this.viviendaService.patchVivienda(vivienda).subscribe();
  }

}
