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
  usuarios : any = [];
  usuarioActual : any;

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

    this.fs.traerUsuarios().subscribe((value=>{
      this.usuarios = value;

      for (const iterator of this.usuarios) 
      {
        if(iterator.nombre == this.fs.usuario.nombre)
        {
          this.usuarioActual = iterator;
          break;
        }
      }
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
      if(this.fs.sonido){
      this.reproducirSonido("audioError");
      }
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
      usuario : this.usuarioActual,
      tiempoEstimado : this.tiempoEstimado,
      estado : "espera",
      entregaConfirmada : false,
      mesa : this.usuarioActual.mesa,
      pagoConfirmado : false
    }

    this.loading = true;
    
    setTimeout(() => {

      this.fs.agregarPedido(pedido);
      if(this.fs.sonido){
      this.reproducirSonido("audioBueno2");
      }
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
