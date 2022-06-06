import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaTeTiPageRoutingModule } from './ta-te-ti-routing.module';

import { TaTeTiPage } from './ta-te-ti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaTeTiPageRoutingModule
  ],
  declarations: [TaTeTiPage]
})
export class TaTeTiPageModule {}
