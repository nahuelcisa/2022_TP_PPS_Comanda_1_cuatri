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

import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';
//Falta page para clientes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatMenuModule,
    NgxChartsModule
  ],
  declarations: [
    HomePage,
    HomeSupervisorPage,
    HomeMetrePage,
    HomeMozoPage,
    HomeCocinaPage,
    HomeClientePage,
    ListaProductosPage
  ],
  providers: [{
    provide: MAT_MENU_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class HomePageModule {}
