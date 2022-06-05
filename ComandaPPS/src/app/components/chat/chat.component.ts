import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  mensajes : any;
  mensaje : any;
  mensajeEnviar: any = "";

  constructor() { }

  ngOnInit() {}

  onEnviar(){
    //envio
    console.log(this.mensajeEnviar);    

    this.mensajeEnviar = "";
  }
}
