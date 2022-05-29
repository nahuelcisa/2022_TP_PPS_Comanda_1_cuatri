import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaEmpleadoPageRoutingModule } from './encuesta-empleado-routing.module';

import { EncuestaEmpleadoPage } from './encuesta-empleado.page';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule, MAT_MENU_DEFAULT_OPTIONS} from '@angular/material/menu';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestaEmpleadoPageRoutingModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatMenuModule
  ],
  declarations: [EncuestaEmpleadoPage]
})
export class EncuestaEmpleadoPageModule {}
