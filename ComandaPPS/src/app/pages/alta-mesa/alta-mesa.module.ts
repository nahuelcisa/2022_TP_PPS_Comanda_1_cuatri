import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaMesaPageRoutingModule } from './alta-mesa-routing.module';

import { AltaMesaPage } from './alta-mesa.page';
import {MatMenuModule, MAT_MENU_DEFAULT_OPTIONS} from '@angular/material/menu';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaMesaPageRoutingModule,
    MatMenuModule,
    QRCodeModule
  ],
  declarations: [AltaMesaPage]
})
export class AltaMesaPageModule {}
