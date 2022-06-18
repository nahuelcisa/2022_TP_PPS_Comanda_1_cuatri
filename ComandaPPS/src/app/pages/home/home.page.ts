import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PushService } from 'src/app/services/push-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  usuarios : any = [];
  usuariosArray : any = [];

  usuarioLogeado : any;

  page_titulo: string = "";

  view_pageSupervisor: boolean = false;
  view_pageCocina: boolean = false;
  view_pageMetre: boolean = false;
  view_pageMozo: boolean = false;
  
  //Page que faltan
  view_pageClientes: boolean = false;
  view_pageBartender: boolean = false;
  view_pageAnonimo: boolean = false;
  view_pageCliente: boolean = false;

  constructor(private as : AuthService, private fs : FirestoreService, private push : PushService) 
  {  
    console.log("constructor");
    this.push.getUser(); 
      this.homePage();

  }
  
  ngOnInit() {
    
  }

  homePage(){

    this.view_pageSupervisor = false;
    this.view_pageMozo = false;
    this.view_pageMetre = false;
    this.view_pageCocina = false;
    this.view_pageClientes = false;
    this.view_pageBartender = false;
    this.view_pageAnonimo = false;

    this.view_pageCliente = false;
    console.log(this.as.logeado.perfil);
    //Default HomePage Clientes
    switch (this.as.logeado.perfil) {
      case "Supervisor":
          this.view_pageSupervisor = true;                  
          this.page_titulo = "Supervisor";
        break;
      
      case "cliente":
          this.view_pageCliente = true;                  
          this.page_titulo = "Cliente";
        break;

      case "Dueño":
          this.view_pageSupervisor = true;
          this.page_titulo = "Dueño";
        break;

      case "Cocinero":
          this.view_pageCocina = true;
          this.page_titulo = "Cocina";
        break;

      case "Metre":
          this.view_pageMetre = true;
          this.page_titulo = "Metre";
        break;

      case "Mozo":
          this.view_pageMozo = true;
          this.page_titulo = "Mozo";
        break;
      
      case "Bartender":
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

