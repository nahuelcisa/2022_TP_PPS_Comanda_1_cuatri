import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pregunta5PageRoutingModule } from './pregunta5-routing.module';

import { Pregunta5Page } from './pregunta5.page';

import {MatMenuModule, MAT_MENU_DEFAULT_OPTIONS} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pregunta5PageRoutingModule,
    MatMenuModule
  ],
  declarations: [Pregunta5Page]
})
export class Pregunta5PageModule {}
