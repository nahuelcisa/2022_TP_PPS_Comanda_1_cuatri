import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeMozoPageRoutingModule } from './home-mozo-routing.module';

import { HomeMozoPage } from './home-mozo.page';
import { ChatMozoPage } from '../chat-mozo/chat-mozo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeMozoPageRoutingModule
  ],
  declarations: [HomeMozoPage,ChatMozoPage]
})
export class HomeMozoPageModule {}
