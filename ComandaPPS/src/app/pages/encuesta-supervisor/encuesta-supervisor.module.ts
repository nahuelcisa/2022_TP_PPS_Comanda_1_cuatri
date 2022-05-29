import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaSupervisorPageRoutingModule } from './encuesta-supervisor-routing.module';

import { EncuestaSupervisorPage } from './encuesta-supervisor.page';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule, MAT_MENU_DEFAULT_OPTIONS} from '@angular/material/menu';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestaSupervisorPageRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatMenuModule
  ],
  declarations: [EncuestaSupervisorPage]
})
export class EncuestaSupervisorPageModule {}
