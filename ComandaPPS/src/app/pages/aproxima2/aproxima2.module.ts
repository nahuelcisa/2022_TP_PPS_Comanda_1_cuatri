import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Aproxima2PageRoutingModule } from './aproxima2-routing.module';

import { Aproxima2Page } from './aproxima2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Aproxima2PageRoutingModule
  ],
  declarations: [Aproxima2Page]
})
export class Aproxima2PageModule {}
