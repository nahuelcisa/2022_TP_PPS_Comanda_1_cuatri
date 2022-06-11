import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {


  pagado : boolean = false;
  loading : boolean = false;
  scaneo : boolean = false;
  propina : string;
  propinaporc : number = 5;
  pedido : any;
  precioTotal : number ;
  pedidoElegido : any;
  mesa : any;

  constructor(private fs : FirestoreService, private as : AuthService, private scan : ScannerService) { 
    this.fs.traerPedidos().subscribe(value =>{
     this.pedido = value;
     this.pedidoElegido = this.pedido[29];
     if(this.fs.usuario.descuento != '' && this.fs.usuario.descuento != 0){
      this.pedidoElegido.precioTotal = this.pedidoElegido.precioTotal * this.fs.usuario.descuento;
     }

     this.pedidoElegido = this.pedido.filter(this.usuarioPedido);

     this.fs.traerMesas().subscribe(value =>{
      this.mesa = value;
      for (const iterator of this.mesa) {
        if(this.pedidoElegido.mesa == iterator.nroMesa){
          this.mesa = iterator;
          break;
        }
      }
     });
    });
  }
  
  ngOnInit() {
  }
   
  
  usuarioPedido(item){
    if(item.usuario == this.fs.usuario){
      return true;
    }else{
      return false;
    }
  }

  pagar(){
    this.pedidoElegido.estado = 'pagado';
    this.fs.modificarEstadoPedido(this.pedidoElegido,this.pedidoElegido.id);
    this.fs.usuario.mesa = 0;
    this.fs.usuario.juegoJugado = false;
    this.fs.usuario.descuento = "";
    this.fs.modificarUsuario(this.fs.usuario,this.fs.usuario.id);
    this.mesa.ocupada = false;
    this.fs.modificarMesa(this.mesa, this.mesa.id);
    this.loading = true;
    setTimeout(() => {
      this.pagado = true;
      this.loading = false;
    }, 3000);

  }

  qrPropina(){
    this.scan.test().then((value)=>{
      this.propina = value;
    });

    switch (this.propina) {
      case 'Excelente':
        this.precioTotal = this.pedidoElegido.precioTotal * 0.2 + this.pedidoElegido.precioTotal;
        this.propinaporc = 20;
        break;
      case 'MuyBueno':
        this.precioTotal = this.pedidoElegido.precioTotal * 0.15 + this.pedidoElegido.precioTotal;
        this.propinaporc = 15;

        break;
      case 'Bueno':
        this.precioTotal = this.pedidoElegido.precioTotal * 0.1 + this.pedidoElegido.precioTotal;
        this.propinaporc = 10;
        break;
      case 'Regular':
        this.precioTotal = this.pedidoElegido.precioTotal * 0.05 + this.pedidoElegido.precioTotal;
        this.propinaporc = 5;

        break;
      default:
        break;
    }
    this.loading = true;
    setTimeout(() => {
      this.scaneo = true;
      this.loading = false;
    }, 3000);
  }


}
