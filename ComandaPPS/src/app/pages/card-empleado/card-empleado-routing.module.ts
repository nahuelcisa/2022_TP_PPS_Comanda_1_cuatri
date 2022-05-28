import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardEmpleadoPage } from './card-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: CardEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardEmpleadoPageRoutingModule {}
