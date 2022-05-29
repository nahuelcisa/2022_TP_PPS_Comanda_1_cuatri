import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta2Page } from './pregunta2.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta2PageRoutingModule {}
