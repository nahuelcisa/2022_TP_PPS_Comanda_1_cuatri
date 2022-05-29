import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta2PageRoutingModule } from './pregunta2-routing.module';

import { Pregunta2Page } from './pregunta2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta2PageRoutingModule
  ],
  declarations: [Pregunta2Page]
})
export class Pregunta2PageModule {}
