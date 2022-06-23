import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  todasOfertas: OfertaImpl[] = [];

  public venta: VentaImpl = new VentaImpl(0,"","","",0);
  public alquiler: AlquilerImpl = new AlquilerImpl(0,"","","",0,0);

  constructor(
    private alquilerService: AlquilerService,
    private ventaService: VentaService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.getTodasOfertas();
  }

  getTodasOfertas(): void {
    ;
    this.todasOfertas = [];
    this.ventaService.getVenta().subscribe((response) => {
      this.todasOfertas.push(
        ...this.ventaService.extraerVenta(response)
      );

      this.alquilerService.getAlquiler().subscribe((response) => {
        ;
        this.todasOfertas.push(
          ...this.alquilerService.extraerAlquiler(response)
        );
      });
    });
  }

  onOfertaEliminar(oferta: OfertaImpl) {
      debugger;
    if (oferta.tipo === 2) {
      this.ventaService
        .deleteVenta(oferta.idOferta)
        .subscribe((response) => {
          this.getTodasOfertas();
        });
    } else {
      this.alquilerService
        .deleteAlquiler(oferta.idOferta)
        .subscribe((response) => {
          this.getTodasOfertas();
        });
    }
  }

  verOferta(oferta: OfertaImpl){
    ;
    console.log(oferta);
  }
}
