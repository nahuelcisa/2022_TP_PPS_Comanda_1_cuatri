import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaTeTiPage } from './ta-te-ti.page';

const routes: Routes = [
  {
    path: '',
    component: TaTeTiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaTeTiPageRoutingModule {}
