import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardEmpleadoClientePage } from './card-empleado-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CardEmpleadoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardEmpleadoClientePageRoutingModule {}
