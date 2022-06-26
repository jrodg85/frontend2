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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuxiliarService } from '../service/auxiliar.service';
import { OfertasViviendaItemComponent } from './ofertas-vivienda/ofertas-vivienda-item/ofertas-vivienda-item.component';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';



@NgModule({
  declarations: [
    OfertasComponent,
    OfertaFormComponent,
    OfertaItemComponent,
    EdicionOfertasComponent,
    OfertasViviendaComponent,
    VentaComponent,
    VentaItemComponent,
    AlquilerComponent,
    AlquilerItemComponent,
    OfertasViviendaComponent,
    OfertasViviendaItemComponent,
    CrearOfertaComponent,
],
  imports: [
    CommonModule,
    OfertasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [AuxiliarService]
})
export class OfertasModule { }
