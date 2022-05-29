import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta4PageRoutingModule } from './pregunta4-routing.module';

import { Pregunta4Page } from './pregunta4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta4PageRoutingModule
  ],
  declarations: [Pregunta4Page]
})
export class Pregunta4PageModule {}
