import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  page_titulo: string = "";

  view_pageSupervisor: boolean = true;
  view_pageCocina: boolean = false;
  view_pageMetre: boolean = false;
  view_pageMozo: boolean = false;
  
  //Page que faltan
  view_pageClientes: boolean = false;
  view_pageBartender: boolean = false;
  view_pageAnonimo: boolean = false;

  constructor(private as : AuthService) 
  {     
    
  }
  
  ngOnInit() {    
    //this.homePage();
  }

  homePage(){
    //Default HomePage Clientes
    switch (this.as.logeado.email) {
      case "supervisor@supervisor.com":
          this.view_pageSupervisor = true;
          this.page_titulo = "Supervisor";
        break;

      case "duenio@duenio.com":
          this.view_pageSupervisor = true;
          this.page_titulo = "Dueño";
        break;

      case "cocinero@cocinero.com":
          this.view_pageCocina = true;
          this.page_titulo = "Cocina";
        break;

      case "metre@metre.com":
          this.view_pageMetre = true;
          this.page_titulo = "Metre";
        break;

      case "mozo@mozo.com":
          this.view_pageMozo = true;
          this.page_titulo = "Mozo";
        break;
      
      case "bartender@bartender.com":
          this.view_pageBartender = true;
          this.page_titulo = "Bartender";
        break;
      
      case "anonimo@anonimo.com":
          this.view_pageAnonimo = true;
        break;

      default:
        this.view_pageClientes = true; 
        this.page_titulo = "Clientes";       
        break;
    }
  }
}
