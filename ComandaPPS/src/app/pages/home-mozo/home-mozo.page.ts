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
  consulta : boolean = false;
  consultas : any = [];
  chat : boolean = false;
  emisor : any;
  principal : boolean = true;

  constructor(
    private fs : FirestoreService, 
    private toast : ToastController,
    private as : AuthService,
    private push : PushService
  ){ 
    this.loading = true;

    this.fs.traerPedidos().subscribe(value => {
        this.confirmacionPedidosArray = [];
        this.pedidosConfirmadosArray = [];
        this.pedidos = value;
        this.cargarArrayPedidos();
    });

    this.fs.traerConsultas().subscribe(value => {
      this.consultas = value;
  });
  }

  ngOnInit() {    
  }

  cargarArrayPedidos(){
    for (const item of this.pedidos) {
      this.confirmacionPedidosArray.push(item);   
      this.pedidosConfirmadosArray.push(item);   
    }
    this.loading = false;

    //Filtro los pedidos que no esten en estado Terminado
    this.confirmacionPedidosArray = this.confirmacionPedidosArray.filter(this.filtrarPedidosAConfirmar);
    this.pedidosConfirmadosArray = this.pedidosConfirmadosArray.filter(this.filtrarPedidosEnPreparacion);
  }
  

  filtrarPedidosEnPreparacion(item){
    if(item.estado == 'en preparacion' || item.estado == 'listo' || item.estado == "terminado"){
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
    item.estado = "en preparacion";
    
    //Si el item tiene Productos de Tipo COCINA le agrego el estadoCocina = false
    //Si el item tiene Productos de Tipo BAR le agrego el estadoBartender = false 
    for (let index = 0; index < item.productos.length; index++) {
        if(item.productos[index].tipo == "cocina"){
          item.estadoCocina = false;
        }
        if(item.productos[index].tipo == "bar"){
          item.estadoBartender = false;   
        }
    }
              
    this.fs.modificarEstadoPedido(item, item.id); 

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
      this.consulta = false;
      this.principal = true;
    }, 1000);
       
  }

  onEntregarPedido(item : any){    
    if(item.estado == "en preparacion"){
      this.DangerToastPedidoEnPreparacion();
    }else if(item.estado == "terminado"){
        item.estado = "entregado";
               
        this.fs.modificarEstadoPedido(item, item.id);

        this.SuccessToastPedidoEntregado();                 
    }    
  }

  verConsultas()
  {
    this.consulta = true;
    this.principal = false;
  }

  responderConsulta(dato : any)
  {
    this.chat = true;
    this.emisor = dato;
    this.consulta = false;
  }

  esconderChat()
  {
    this.consulta = true;
    this.chat = false;
    this.emisor = "";
  }

}
