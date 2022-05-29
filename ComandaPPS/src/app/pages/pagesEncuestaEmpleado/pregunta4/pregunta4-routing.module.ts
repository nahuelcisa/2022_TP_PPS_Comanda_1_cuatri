import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta4Page } from './pregunta4.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta4PageRoutingModule {}
