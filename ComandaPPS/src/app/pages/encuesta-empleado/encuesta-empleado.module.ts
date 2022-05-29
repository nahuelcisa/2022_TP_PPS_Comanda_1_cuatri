import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaEmpleadoPageRoutingModule } from './encuesta-empleado-routing.module';

import { EncuestaEmpleadoPage } from './encuesta-empleado.page';

import { Pregunta1Page } from '../pagesEncuestaEmpleado/pregunta1/pregunta1.page';
import { Pregunta2Page } from '../pagesEncuestaEmpleado/pregunta2/pregunta2.page';
import { Pregunta3Page } from '../pagesEncuestaEmpleado/pregunta3/pregunta3.page';
import { Pregunta4Page } from '../pagesEncuestaEmpleado/pregunta4/pregunta4.page';
import { Pregunta5Page } from '../pagesEncuestaEmpleado/pregunta5/pregunta5.page';

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
  declarations: [
    EncuestaEmpleadoPage,
    Pregunta1Page,
    Pregunta2Page,
    Pregunta3Page,
    Pregunta4Page,
    Pregunta5Page
  ]
})
export class EncuestaEmpleadoPageModule {}
