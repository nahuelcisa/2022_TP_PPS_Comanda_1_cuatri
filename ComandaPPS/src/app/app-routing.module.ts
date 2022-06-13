import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
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
  },
  {
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
  {
    path: 'pregunta1',
    loadChildren: () => import('./pages/pagesEncuestaEmpleado/pregunta1/pregunta1.module').then( m => m.Pregunta1PageModule)
  },
  {
    path: 'pregunta2',
    loadChildren: () => import('./pages/pagesEncuestaEmpleado/pregunta2/pregunta2.module').then( m => m.Pregunta2PageModule)
  },
  {
    path: 'pregunta3',
    loadChildren: () => import('./pages/pagesEncuestaEmpleado/pregunta3/pregunta3.module').then( m => m.Pregunta3PageModule)
  },
  {
    path: 'pregunta4',
    loadChildren: () => import('./pages/pagesEncuestaEmpleado/pregunta4/pregunta4.module').then( m => m.Pregunta4PageModule)
  },
  {
    path: 'pregunta5',
    loadChildren: () => import('./pages/pagesEncuestaEmpleado/pregunta5/pregunta5.module').then( m => m.Pregunta5PageModule)
  },
  {
    path: 'home-metre',
    loadChildren: () => import('./pages/home-metre/home-metre.module').then( m => m.HomeMetrePageModule)
  },
  {
    path: 'home-cocina',
    loadChildren: () => import('./pages/home-cocina/home-cocina.module').then( m => m.HomeCocinaPageModule)
  },
  {
    path: 'home-mozo',
    loadChildren: () => import('./pages/home-mozo/home-mozo.module').then( m => m.HomeMozoPageModule)
  },
  {
    path: 'home-supervisor',
    loadChildren: () => import('./pages/home-supervisor/home-supervisor.module').then( m => m.HomeSupervisorPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'encuesta-cliente',
    loadChildren: () => import('./pages/encuesta-cliente/encuesta-cliente.module').then( m => m.EncuestaClientePageModule)
  },
  {
    path: 'lista-productos',
    loadChildren: () => import('./pages/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  },
  {
    path: 'home-cliente',
    loadChildren: () => import('./pages/home-cliente/home-cliente.module').then( m => m.HomeClientePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'ta-te-ti',
    loadChildren: () => import('./pages/ta-te-ti/ta-te-ti.module').then( m => m.TaTeTiPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'aproxima2',
    loadChildren: () => import('./pages/aproxima2/aproxima2.module').then( m => m.Aproxima2PageModule)
  },
  {
    path: 'home-bartender',
    loadChildren: () => import('./pages/home-bartender/home-bartender.module').then( m => m.HomeBartenderPageModule)
  },
  {
    path: 'alta-anonimo',
    loadChildren: () => import('./pages/alta-anonimo/alta-anonimo.module').then( m => m.AltaAnonimoPageModule)
  },
  {
    path: 'chart-encuesta-clientes',
    loadChildren: () => import('./pages/chart-encuesta-clientes/chart-encuesta-clientes.module').then( m => m.ChartEncuestaClientesPageModule)
  },   {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
