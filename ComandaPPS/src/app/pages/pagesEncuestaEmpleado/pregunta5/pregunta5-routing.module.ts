import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pregunta5Page } from './pregunta5.page';

const routes: Routes = [
  {
    path: '',
    component: Pregunta5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pregunta5PageRoutingModule {}
