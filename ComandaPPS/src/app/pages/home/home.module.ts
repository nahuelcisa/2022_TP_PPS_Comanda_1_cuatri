import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatMenuModule, MAT_MENU_DEFAULT_OPTIONS} from '@angular/material/menu';

import { HomeSupervisorPage } from '../home-supervisor/home-supervisor.page';

import { HomeMetrePage } from '../home-metre/home-metre.page';
import { HomeMozoPage } from '../home-mozo/home-mozo.page';
import { HomeCocinaPage } from '../home-cocina/home-cocina.page'; 
import { HomeClientePage } from '../home-cliente/home-cliente.page';
import { HomeBartenderPage } from '../home-bartender/home-bartender.page';

import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ChartEncuestaClientesPage } from '../chart-encuesta-clientes/chart-encuesta-clientes.page';
import { CuentaPage } from '../cuenta/cuenta.page';
import { ChatPage } from '../chat/chat.page';
import { EncuestaClientePage } from '../encuesta-cliente/encuesta-cliente.page';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
//Falta page para clientes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatMenuModule,
    NgxChartsModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  declarations: [
    HomePage,
    HomeSupervisorPage,
    HomeMetrePage,
    HomeMozoPage,
    HomeCocinaPage,
    HomeClientePage,
    ListaProductosPage,
    ChartEncuestaClientesPage,
    CuentaPage,
    ChatPage,
    EncuestaClientePage,
    HomeBartenderPage
  ],
  providers: [{
    provide: MAT_MENU_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class HomePageModule {}
