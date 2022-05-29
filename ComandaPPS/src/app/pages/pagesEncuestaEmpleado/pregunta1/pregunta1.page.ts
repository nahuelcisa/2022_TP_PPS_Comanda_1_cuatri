import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.page.html',
  styleUrls: ['./pregunta1.page.scss'],
})
export class Pregunta1Page implements OnInit {

  @Output() respuesta1 = new EventEmitter();

  valor_respuesta: any; //Capturo el valor de la respuesta

  constructor() { }

  ngOnInit() {
  }
  
  capturarRespuesta(event: any){
    //console.log(event.detail.value);
    this.valor_respuesta = event.detail.value;
    //console.log(this.valor_respuesta);
    this.respuesta1.emit(this.valor_respuesta);
    this.valor_respuesta = 0;
  }

}
