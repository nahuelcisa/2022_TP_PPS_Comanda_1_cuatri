import { Component, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push-service.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {

  productos : any = [];
  productosArray : any = [];

  @Output() atrasEvent = new EventEmitter<boolean>();

  loading : boolean = false;

  carrito : any = [];
  precioCarrito : number = 0;
  tiempoEstimado : number = 0;

  constructor(public fs: FirestoreService, private toast : ToastController, private push : PushService) {
    this.fs.traerProductos().subscribe((value=>{
      this.productos = value;
      this.cargarArray();
    }));
   }

  ngOnInit() {
  }

  cargarArray(){
    for (const item of this.productos) {
      this.productosArray.push(item);
    }
  }

  cargarCarrito(item : any){
    if(this.carrito.length < 4){
      this.carrito.push(item);
      item.cantidad++;
      this.tiempoEstimado += parseInt(item.tiempoPromedio);
      this.precioCarrito += parseInt(item.precio);
    }else{
      this.ErrorToastCarrito();
    }
  }

  quitarProductoCarrito(item : any){
    let index = this.carrito.indexOf(item);
    if(index != -1){
      this.carrito.splice(index,1);
      item.cantidad--;
      this.precioCarrito -= parseInt(item.precio);
      this.tiempoEstimado -= parseInt(item.tiempoPromedio);
    }
  }

  realizarPedido(){
    let pedido = {
      productos : this.carrito,
      precioTotal : this.precioCarrito,
      usuario : this.fs.usuario,
      tiempoEstimado : this.tiempoEstimado,
      estado : "espera",
      entregaConfirmada : false
    }

    this.loading = true;
    
    setTimeout(() => {

      this.fs.agregarPedido(pedido);
      this.successToast();
      this.loading = false;

      //esconder la lista de productos
      this.atrasEvent.emit(false);
    }, 3000);

  }

  async ErrorToastCarrito() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Carrito lleno!!',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  async successToast() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Pedido enviado excitosamente!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }
}
