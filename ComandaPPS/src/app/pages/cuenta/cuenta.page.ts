import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {


  pagado : boolean = false;
  scaneo : boolean = true;

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
