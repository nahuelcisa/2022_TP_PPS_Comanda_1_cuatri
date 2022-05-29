import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta3Page } from './pregunta3.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta3PageRoutingModule {}
