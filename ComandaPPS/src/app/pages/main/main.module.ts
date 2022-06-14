import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

import { ChatComponent } from 'src/app/components/chat/chat.component';
import { PiedraPapelTijeraComponent } from 'src/app/components/piedra-papel-tijera/piedra-papel-tijera.component';
import { ChatMozoPage } from '../chat-mozo/chat-mozo.page';
import { ChatPage } from '../chat/chat.page';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    MainPage,
    ChatComponent,
    PiedraPapelTijeraComponent,
    ChatMozoPage,
    ChatPage
  ]
})
export class MainPageModule {}
