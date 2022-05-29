import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta3PageRoutingModule } from './pregunta3-routing.module';

import { Pregunta3Page } from './pregunta3.page';

import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta3PageRoutingModule,
    MatRadioModule
  ],
  declarations: [Pregunta3Page]
})
export class Pregunta3PageModule {}
