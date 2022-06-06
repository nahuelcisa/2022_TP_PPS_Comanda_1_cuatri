import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaTeTiPageRoutingModule } from './ta-te-ti-routing.module';

import { TaTeTiPage } from './ta-te-ti.page';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaTeTiPageRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [TaTeTiPage]
})
export class TaTeTiPageModule {}
