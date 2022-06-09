import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedido : any;
  constructor(private fs : FirestoreService, private as : AuthService) { 
     this.fs.traerPedidos().subscribe(value =>{
      this.pedido = value;
      this.pedido = this.pedido.filter(this.usuarioPedido);
     });
  }

  ngOnInit() {
  }

  usuarioPedido(item){
    if(item.usuario.email == this.as.logeado.email){
      return true;
    }else{
      return false;
    }
  }
}
