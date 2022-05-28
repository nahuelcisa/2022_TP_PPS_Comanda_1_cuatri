import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardEmpleadoPageRoutingModule } from './card-empleado-routing.module';

import { CardEmpleadoPage } from './card-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardEmpleadoPageRoutingModule
  ],
  declarations: [CardEmpleadoPage]
})
export class CardEmpleadoPageModule {}
