import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaDuenSupPageRoutingModule } from './alta-duen-sup-routing.module';

import { AltaDuenSupPage } from './alta-duen-sup.page';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaDuenSupPageRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  declarations: [AltaDuenSupPage]
})
export class AltaDuenSupPageModule {}
