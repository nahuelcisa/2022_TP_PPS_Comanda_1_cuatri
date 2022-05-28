import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-card-empleado-cliente',
  templateUrl: './card-empleado-cliente.page.html',
  styleUrls: ['./card-empleado-cliente.page.scss'],
})
export class CardEmpleadoClientePage implements OnInit {

  arrayClientes : any = [];

  constructor(public as : AuthService, private fs : FirestoreService) { }

  ngOnInit() {

    this.fs.traerClientes().subscribe((value)=>{
      this.arrayClientes = value;
      this.arrayClientes.sort(this.ordenar);   
    });  
  }

  ordenar(a:any,b:any){
    if (a.nombre > b.nombre) {
      return 1;
    }
    else if (a.nombre < b.nombre) {
      return -1;
    }else {
      return 0;
    }
  }

}
