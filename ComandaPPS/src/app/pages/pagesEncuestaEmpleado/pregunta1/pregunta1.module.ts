import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta1PageRoutingModule } from './pregunta1-routing.module';

import { Pregunta1Page } from './pregunta1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta1PageRoutingModule
  ],
  declarations: [Pregunta1Page]
})
export class Pregunta1PageModule {}
