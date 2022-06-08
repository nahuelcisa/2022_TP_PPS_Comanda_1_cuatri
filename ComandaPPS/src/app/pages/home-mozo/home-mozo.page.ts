import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push-service.service';

@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.page.html',
  styleUrls: ['./home-mozo.page.scss'],
})
export class HomeMozoPage implements OnInit {

  listConfirmarPedido: boolean = true;
  listEnEspera: boolean = false;

  loading : boolean;

  pedidos: any = [];
  confirmacionPedidosArray: any = [];//Cargo los pedidos a confirmar en este array 
  pedidosConfirmadosArray: any = [];//Cargo los pedidos ya confirmados en este array 

  titulo: string = "Pedidos a Confirmar";

  constructor(
    private fs : FirestoreService, 
    private toast : ToastController,
    private as : AuthService,
    private push : PushService
  ){ 
    this.loading = true;

    this.fs.traerPedidos().subscribe(value => {
        this.pedidos = value;
        this.cargarArrayPedidos();
    });
  }

  ngOnInit() {    
  }

  cargarArrayPedidos(){
    for (const item of this.pedidos) {
      this.confirmacionPedidosArray.push(item);   
      this.pedidosConfirmadosArray.push(item);   
    }

    //console.log(this.confirmacionPedidosArray);

    this.loading = false;
    //Filtro los pedidos que no esten en estado Terminado
    this.confirmacionPedidosArray = this.confirmacionPedidosArray.filter(this.filtrarPedidosAConfirmar);
    this.pedidosConfirmadosArray = this.pedidosConfirmadosArray.filter(this.filtrarPedidosEnPreparacion);

    //console.log(this.confirmacionPedidosArray);
    //console.log(this.pedidosConfirmadosArray);
  }
  

  filtrarPedidosEnPreparacion(item){
    if(item.estado == 'en preparacion' || item.estado == 'listo'){
      return true;
    }else{
      return false;
    }
  }

  filtrarPedidosAConfirmar(item){
    if(item.estado == 'espera' || item.estado == 'en proceso'){
      return true;
    }else{
      return false;
    }
  }

  async SuccessToastPedidoConfirmado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pedido Confirmado.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  async DangerToastPedidoEnPreparacion() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'El pedido sigue en preparación',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async SuccessToastPedidoEntregado() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pedido Entregado.',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  onConfirmarPedido(item: any){
    //Doy de alta a las collecciones de bartender y cocina 
    //asociando el pedido con su id + campoEstadoBart(si no tiene vacio) + Cocina (si no tiene vacio) 
    
    // console.log("Pedido a Modificar");
    // console.log("ID:" + item.id);
    // console.log(item);

    
    item.estado = "en preparacion"; //Cambio el estado a "En preparacion"

    this.fs.modificarEstadoPedido(item, item.id); //Modifico en el Firebase

    this.SuccessToastPedidoConfirmado();
  }

  onVerPedidosEnPreparacion(){

    this.titulo = "Pedidos en Preparación";
    this.listConfirmarPedido = false;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.listEnEspera = true;
    }, 1000);
  }

  onVerPedidosAConfirmar(){
    
    this.titulo = "Pedidos a Confirmar";
    this.listEnEspera = false;
    this.loading = true;
    
    setTimeout(() => {
      this.loading = false;
      this.listConfirmarPedido = true;
    }, 1000);
       
  }

  onEntregarPedido(item : any){
    
    if(item.estado == "en preparacion"){
      this.DangerToastPedidoEnPreparacion();
    }else{
      this.SuccessToastPedidoEntregado();

      //Cuando este el pedido Listo doy a Entregar y se Elimina de la lista
    }
    


  }

}
