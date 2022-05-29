import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardEmpleadoClientePageRoutingModule } from './card-empleado-cliente-routing.module';

import { CardEmpleadoClientePage } from './card-empleado-cliente.page';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardEmpleadoClientePageRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [CardEmpleadoClientePage]
})
export class CardEmpleadoClientePageModule {}
