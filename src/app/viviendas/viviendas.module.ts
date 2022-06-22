import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViviendasRoutingModule } from './viviendas-routing.module';
import { ViviendasComponent } from './viviendas/viviendas.component';
import { ViviendaComponent } from './viviendas/vivienda/vivienda.component';
import { ViviendaFormComponent } from './vivienda-form/vivienda-form.component';
import { ViviendaItemComponent } from './vivienda-item/vivienda-item.component';
import { FormsModule } from '@angular/forms';
import { AuxiliarService } from '../service/auxiliar.service';


@NgModule({
  declarations: [
    ViviendasComponent,
    ViviendaComponent,
    ViviendaFormComponent,
    ViviendaItemComponent
  ],
  imports: [
    CommonModule,
    ViviendasRoutingModule,
    FormsModule,
  ],
  exports: [ ViviendaComponent],
  providers: [AuxiliarService]
})
export class ViviendasModule { }
