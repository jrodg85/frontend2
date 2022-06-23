import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { OfertaViviendaService } from '../service/oferta-vivienda.service';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-ofertas-vivienda',
  templateUrl: './ofertas-vivienda.component.html',
  styleUrls: ['./ofertas-vivienda.component.css']
})
export class OfertasViviendaComponent implements OnInit {
  @Input() oferta: OfertaImpl = new OfertaImpl(0, "","","");

  oferta$: Observable<any> = new Observable<any>();
  todasOfertas: OfertaImpl[] = [];

  public provincia: string = '';
  public ciudad: string = '';
  public direccion: string = '';
  public codigoPostal: number = 0;
  public idReferenciaCatastral: string = '';
  public superficie: number = 0;
  public venta: VentaImpl = new VentaImpl(0, "","","",0);
  public alquiler: AlquilerImpl = new AlquilerImpl(0, "","","",0, 0);

  constructor(
    private activateRoute: ActivatedRoute,
    private alquilerService: AlquilerService,
    private ventaService: VentaService,
    private ofertasViviendaService: OfertaViviendaService
  ) {}

  ngOnInit(): void {
    this.oferta$ = this.cargarOferta();
  }

  cargarOferta(): any {
  this.todasOfertas=[];

    console.log('id = ', this.activateRoute.snapshot.params['id']);
    this.provincia = this.activateRoute.snapshot.params['provincia'];
    this.ciudad = this.activateRoute.snapshot.params['ciudad'];
    this.direccion = this.activateRoute.snapshot.params['direccion'];
    this.codigoPostal = this.activateRoute.snapshot.params['codigoPostal'];
    this.idReferenciaCatastral = this.activateRoute.snapshot.params['idReferenciaCatastral'];
    this.superficie = this.activateRoute.snapshot.params['superficie'];
    this.ofertasViviendaService
      .getOfertasVivienda(this.activateRoute.snapshot.params['id'])
      .subscribe(
        (vivienda) => {
          console.log(vivienda);
          if (vivienda._embedded.ventas) {
            vivienda._embedded.ventas.forEach((a: any) => {
              debugger;
              const urlSelf = a._links.self.href;
              const url = urlSelf.split('/');
              const id = parseInt(url[url.length - 1]);
              a.tipo = 2;
              a.id = id;
              this.todasOfertas.push(a);
            });
          }
          if (vivienda._embedded.alquileres) {
            vivienda._embedded.alquileres.forEach((o: any) => {
              const urlSelf = o._links.self.href;
              const url = urlSelf.split('/');
              const id = parseInt(url[url.length - 1]);
              o.tipo = 1;
              o.id = id;
              this.todasOfertas.push(o);
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  onOfertaEliminar(oferta: OfertaImpl) {
    if (oferta.tipo === 2) {
      this.ventaService.deleteVenta(oferta.idOferta).subscribe((response) => {
        this.cargarOferta();
      });
    } else {
      this.alquilerService.deleteAlquiler(oferta.idOferta).subscribe((response) => {
        this.cargarOferta();
      });
    }
  }
  verOferta(oferta: OfertaImpl) {
    console.log(oferta);
  }
}
