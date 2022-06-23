import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViviendaFormComponent } from './vivienda-form/vivienda-form.component';
import { ViviendasComponent } from './viviendas/viviendas.component';

const routes: Routes = [
  {
    path:'',
  component: ViviendasComponent,
  },
  {
    path: 'vivienda-form',
    component: ViviendaFormComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViviendasRoutingModule { }


//done
