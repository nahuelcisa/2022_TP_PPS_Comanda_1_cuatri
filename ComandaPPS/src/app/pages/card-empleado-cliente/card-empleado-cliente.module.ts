import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardEmpleadoClientePageRoutingModule } from './card-empleado-cliente-routing.module';

import { CardEmpleadoClientePage } from './card-empleado-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardEmpleadoClientePageRoutingModule
  ],
  declarations: [CardEmpleadoClientePage]
})
export class CardEmpleadoClientePageModule {}
