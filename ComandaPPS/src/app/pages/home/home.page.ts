import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  usuarios : any = [];
  usuariosArray : any = [];

  usuarioLogeado : any;

  page_titulo: string = "";

  view_pageSupervisor: boolean = true;
  view_pageCocina: boolean = false;
  view_pageMetre: boolean = false;
  view_pageMozo: boolean = false;
  
  //Page que faltan
  view_pageClientes: boolean = false;
  view_pageBartender: boolean = false;
  view_pageAnonimo: boolean = false;

  constructor(private as : AuthService, private fs : FirestoreService) 
  {     
  }
  
  ngOnInit() {
    this.fs.traerUsuarios().subscribe(value => {
      this.usuarios = value;
      this.cargarArray();
      console.log(value);
        for (const item of this.usuariosArray) {
           if(item.email == this.as.logeado.email && item.clave == this.as.logeado.password){
            this.usuarioLogeado = item;
            this.homePage();
            console.log(this.usuarioLogeado);
          } 
        }    
     
    }); 
  }

  cargarArray(){
    for (const item of this.usuarios) {
      this.usuariosArray.push(item);
    }
  }
  
  homePage(){

    //Default HomePage Clientes
    switch (this.usuarioLogeado.perfil) {
      case "supervisor":
          this.view_pageSupervisor = true;
          this.page_titulo = "Supervisor";
        break;

      case "Dueño":
          this.view_pageSupervisor = true;
          this.page_titulo = "Dueño";
          console.log("switch dueño");
        break;

      case "cocinero":
          this.view_pageCocina = true;
          this.page_titulo = "Cocina";
        break;

      case "metre":
          this.view_pageMetre = true;
          this.page_titulo = "Metre";
        break;

      case "mozo":
          this.view_pageMozo = true;
          this.page_titulo = "Mozo";
        break;
      
      case "bartender":
          this.view_pageBartender = true;
          this.page_titulo = "Bartender";
        break;
      
      case "anonimo":
          this.view_pageAnonimo = true;
        break;

      default:
        this.view_pageClientes = true; 
        this.page_titulo = "Clientes";       
        break;
    }
  }
}
