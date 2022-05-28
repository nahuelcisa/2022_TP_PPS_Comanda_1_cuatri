import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaDuenSupPage } from './alta-duen-sup.page';

const routes: Routes = [
  {
    path: '',
    component: AltaDuenSupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaDuenSupPageRoutingModule {}
