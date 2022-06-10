import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientePageRoutingModule } from './home-cliente-routing.module';

import { HomeClientePage } from './home-cliente.page';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { EncuestaClientePage } from '../encuesta-cliente/encuesta-cliente.page';
import { TaTeTiPage } from '../ta-te-ti/ta-te-ti.page';
import { Aproxima2Page } from '../aproxima2/aproxima2.page';
import { PiedraPapelTijeraComponent } from 'src/app/components/piedra-papel-tijera/piedra-papel-tijera.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule, MAT_MENU_DEFAULT_OPTIONS} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClientePageRoutingModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  declarations: [HomeClientePage,ListaProductosPage,EncuestaClientePage,TaTeTiPage,Aproxima2Page,PiedraPapelTijeraComponent]
})
export class HomeClientePageModule {}
