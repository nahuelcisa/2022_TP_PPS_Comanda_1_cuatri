import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push-service.service';

@Component({
  selector: 'app-home-cocina',
  templateUrl: './home-cocina.page.html',
  styleUrls: ['./home-cocina.page.scss'],
})
export class HomeCocinaPage implements OnInit {

  pedidosEnPreparacion: any = [];
  pedidosEnPreparacionArray: any = []; //Cargo los pedidos con estado En preparacion

  loading : boolean;

  constructor(
    private fs : FirestoreService, 
    private toast : ToastController,
    private as : AuthService,
    private push : PushService
  ){
    this.loading = true;

    this.fs.traerPedidos().subscribe(value => {
      this.pedidosEnPreparacionArray = [];
      this.pedidosEnPreparacion = value;
      this.cargarArrayPedidosEnPreparacion();
    });
  }

  ngOnInit() {
  }

  async SuccessToastProductoTerminado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Comida Terminada.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  cargarArrayPedidosEnPreparacion(){
    for (const item of this.pedidosEnPreparacion) {
      this.pedidosEnPreparacionArray.push(item);   
    }


    this.loading = false;
    
    this.pedidosEnPreparacionArray = this.pedidosEnPreparacionArray.filter(this.filtrarPedidosNoEnPreparacion);    
    
  }

  filtrarPedidosNoEnPreparacion(item){
    if(item.estado == 'en preparacion' && item.estadoCocina == false){      
      return true;
    }else{
      return false;
    }
  }

  onPedidolisto(item: any){    

    item.estadoCocina = true;
    
    if(item.estadoBartender == true){
      item.estado = "terminado"
    }else if(item.estadoBartender == undefined || item.estadoBartender == null){
      item.estado = "terminado"
    }

    this.fs.modificarEstadoPedido(item, item.id);
    this.reproducirSonido("audioBueno2");
    this.SuccessToastProductoTerminado();
  }

  reproducirSonido(dato : string)
  {
    let ruta : string = '../../../assets/sonidos/';
    let nombreArchivo : string = "";
    let audioNombre : string = "";

    audioNombre = dato + ".mp3"; 
    nombreArchivo = ruta + audioNombre;

    this.reproducir(nombreArchivo);
           
  }

  reproducir(ruta : string)
  {
    let audio = new Audio(ruta);
    audio.play();   
  }
}
