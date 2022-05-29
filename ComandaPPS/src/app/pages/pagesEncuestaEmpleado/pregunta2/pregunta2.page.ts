import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pregunta2',
  templateUrl: './pregunta2.page.html',
  styleUrls: ['./pregunta2.page.scss'],
})
export class Pregunta2Page implements OnInit {

  @Output() respuesta2 = new EventEmitter();

  valor_respuesta: any; //Capturo el valor de la respuesta

  constructor() { }

  ngOnInit() {
    this.respuesta2.emit(this.valor_respuesta);
  }

  capturarRespuesta(event: any){
    //console.log(event.detail.value);
    //console.log(this.valor_respuesta);
    this.valor_respuesta = event.detail.value;
    this.respuesta2.emit(this.valor_respuesta);
    this.valor_respuesta = "";
  }

}
