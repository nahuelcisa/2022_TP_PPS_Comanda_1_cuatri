import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta1Page } from './pregunta1.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta1PageRoutingModule {}
