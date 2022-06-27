import { Component, DebugNode, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlquilerImpl } from '../models/alquiler-impl';
import { OfertaImpl } from '../models/oferta-impl';
import { VentaImpl } from '../models/venta-impl';
import { AlquilerService } from '../service/alquiler.service';
import { OfertaViviendaService } from '../service/oferta-vivienda.service';
import { VentaService } from '../service/venta.service';
import { ViviendaService } from '../../viviendas/service/vivienda.service';

@Component({
  selector: 'app-ofertas-vivienda',
  templateUrl: './ofertas-vivienda.component.html',
  styleUrls: ['./ofertas-vivienda.component.css']
})
export class OfertasViviendaComponent implements OnInit {
  @Input() oferta: OfertaImpl = new OfertaImpl(0, "","","");

  todasOfertas: OfertaImpl[] = [];
public id: string = '';

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
    private ofertasViviendaService: OfertaViviendaService,
    private viviendaService: ViviendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id=this.activateRoute.snapshot.params['id'];
    debugger;
    this.cargarVivienda();
    this.cargarOferta();
  }

  cargarVivienda(){
    this.viviendaService.findById(this.id).subscribe(
    (vivienda)=>{
      this.provincia = vivienda.provincia;
      this.ciudad = vivienda.ciudad;
      this.direccion = vivienda.direccion;
      this.codigoPostal= vivienda.codigoPostal;
      this.idReferenciaCatastral = vivienda.idReferenciaCatastral;
      this.superficie = vivienda.superficie;
    },
    (error) =>{console.error(error);}
    );
  }

  cargarOferta() {
    debugger;
  this.todasOfertas=[];

    console.log('id = ', this.id);

    this.ofertasViviendaService
      .getOfertasVivienda(this.id)
      .subscribe(
        (vivienda) => {
          debugger;
          console.log(vivienda);
          if (vivienda._embedded.ofertas_de_venta) {
            vivienda._embedded.ofertas_de_venta.forEach((a: any) => {
              const urlSelf = a._links.self.href;
              const url = urlSelf.split('/');
              const id = parseInt(url[url.length - 1]);
              a.tipo = 2;
              a.id = id;
              this.todasOfertas.push(a);
            });
          }
          if (vivienda._embedded.ofertas_de_alquiler) {
            vivienda._embedded.ofertas_de_alquiler.forEach((o: any) => {
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
  onOfertaEliminar(oferta: any) {
    debugger;
    if (oferta.tipo === 2) {
      this.ventaService.deleteVenta(oferta.id).subscribe((response) => {
        this.cargarOferta();
      });
    } else {
      this.alquilerService.deleteAlquiler(oferta.id).subscribe((response) => {
        this.cargarOferta();
      });
    }
  }
  verOferta(oferta: any) {
    debugger;
    console.log(oferta);
    this.router.navigate ([`/ofertas/edicion-oferta/${oferta.id}/${oferta.tipo}/${this.id}`]);

  }
}
