import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { CrearOfertaComponent } from './crear-oferta/crear-oferta.component';
import { EdicionOfertasComponent } from './edicion-ofertas/edicion-ofertas.component';
import { OfertaFormComponent } from './oferta-form/oferta-form.component';
import { OfertasViviendaComponent } from './ofertas-vivienda/ofertas-vivienda.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  {
    path:'',
    component: OfertasComponent,
  },
    {
    path: 'ofertas-form/:idVivienda/:type',
    component: OfertaFormComponent,
  },
  {
    path: 'nueva-oferta/:type',
    component: CrearOfertaComponent,
  },
  {
    path: 'edicion-oferta/:id/:type',
    component: EdicionOfertasComponent,
  },
  {
    path: 'edicion-oferta/:id/:type/:idVivienda',
    component: EdicionOfertasComponent,
  },
  {
    path: 'venta/:id',
    component: VentaComponent,
  },
  {
    path: 'alquiler/:id',
    component: AlquilerComponent,
  },
  {
    path: 'ofertas-vivienda/:id',
    component: OfertasViviendaComponent,
    children: [
      {
        path: 'oferta-item', component: OfertasViviendaComponent
      }
    ]
  },
  ];

;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertasRoutingModule { }


//dome
