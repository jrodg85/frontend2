import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViviendasRoutingModule } from './viviendas-routing.module';
import { ViviendasComponent } from './viviendas/viviendas.component';
import { ViviendaComponent } from './viviendas/vivienda/vivienda.component';
import { ViviendaFormComponent } from './vivienda-form/vivienda-form.component';
import { ViviendaItemComponent } from './vivienda-item/vivienda-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuxiliarService } from '../service/auxiliar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [ ViviendaComponent],
  providers: [AuxiliarService]
})
export class ViviendasModule { }


//done
