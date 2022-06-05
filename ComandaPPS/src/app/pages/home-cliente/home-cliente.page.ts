import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {


  loading: boolean = false;

  //1 - Escaneo QR Local
  escaneoQR: boolean = true;
  
  //2- 2 botones de Ver encuestas - Entrar Lista espera
  menuOpciones: boolean = false;

  //3- Esperando a Asignacion de Mesa
  esperaAsignacionMesa: boolean = false;

  
  constructor() 
  { 
    //Busco en la coleccion de Lista de espera si esta, sino esta sigo en pantalla esperaAsignacionMesa
  }

  ngOnInit() {
  }

  onEscanearQR(){
    //alert("Escaneo qr");

    this.escaneoQR = false;   
    
    this.menuOpciones = true;    
  }

  onVerEncuestas(){
      alert("Encuestas");
  }

  onEntrarListaEspera(){
    this.menuOpciones = false;

    this.loading = true;
    this.esperaAsignacionMesa = true;
  }
}
