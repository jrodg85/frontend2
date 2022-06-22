import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasRoutingModule } from './ofertas-routing.module';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';
import { OfertaItemComponent } from './oferta-item/oferta-item.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertasViviendaComponent } from './ofertas-vivienda/ofertas-vivienda.component';
import { EdicionOfertasComponent } from './edicion-ofertas/edicion-ofertas.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { AlquilerItemComponent } from './alquiler-item/alquiler-item.component';
import { VentaComponent } from './venta/venta.component';
import { VentaItemComponent } from './venta-item/venta-item.component';


@NgModule({
  declarations: [
    OfertaFormComponent,
    OfertaItemComponent,
    OfertasComponent,
    OfertasViviendaComponent,
    EdicionOfertasComponent,
    AlquilerComponent,
    AlquilerItemComponent,
    VentaComponent,
    VentaItemComponent
  ],
  imports: [
    CommonModule,
    OfertasRoutingModule
  ]
})
export class OfertasModule { }
