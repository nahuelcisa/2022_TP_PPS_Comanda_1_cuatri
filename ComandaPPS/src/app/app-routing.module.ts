import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'alta-cliente',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./pages/alta-cliente/alta-cliente.module').then( m => m.AltaClientePageModule)
  },    
  {
    path: 'alta-duen-sup',
    loadChildren: () => import('./pages/alta-duen-sup/alta-duen-sup.module').then( m => m.AltaDuenSupPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./pages/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
  },  {
    path: 'alta-empleado',
    loadChildren: () => import('./pages/alta-empleado/alta-empleado.module').then( m => m.AltaEmpleadoPageModule)
  },
  {
    path: 'card-empleado-cliente',
    loadChildren: () => import('./pages/card-empleado-cliente/card-empleado-cliente.module').then( m => m.CardEmpleadoClientePageModule)
  },
  {
    path: 'encuesta-supervisor',
    loadChildren: () => import('./pages/encuesta-supervisor/encuesta-supervisor.module').then( m => m.EncuestaSupervisorPageModule)
  },
  {
    path: 'card-empleado',
    loadChildren: () => import('./pages/card-empleado/card-empleado.module').then( m => m.CardEmpleadoPageModule)
  },
  {
    path: 'encuesta-empleado',
    loadChildren: () => import('./pages/encuesta-empleado/encuesta-empleado.module').then( m => m.EncuestaEmpleadoPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
