import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Aproxima2Page } from './aproxima2.page';

const routes: Routes = [
  {
    path: '',
    component: Aproxima2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Aproxima2PageRoutingModule {}
