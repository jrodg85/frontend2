import { Component, OnInit } from '@angular/core';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { VentaImpl } from '../models/venta-impl';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventas: VentaImpl[] = [];
  todasVentas: VentaImpl[] = [];
    numPaginas: number = 0;

    constructor(
  private ventaService: VentaService,
  private auxService: AuxiliarService) {}


    ngOnInit(): void {
      this.ventaService.getVenta().subscribe((response) => this.ventas =
      this.ventaService.extraerVenta(response));
      this.getTodasVenta();
    }


    getTodasVenta(): void {
      this.ventaService.getVenta().subscribe(r => {
        this.numPaginas = this.auxService.getPaginasResponse(r);
        for (let index = 1; index <= this.numPaginas; index++) {
          this.ventaService.getVentaPagina(index)
            .subscribe(response => {
              this.todasVentas.push(...this.ventaService.extraerVenta(response));
            });
        }
      });
    }

  }
